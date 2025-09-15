// src/services/apiClient.js
import axios from 'axios';
import { API_CONFIG, HTTP_STATUS, ERROR_MESSAGES, STORAGE_KEYS } from '../utils/constants';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

// --- helpers ---
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const isRetryableError = (error) =>
  !error.response || (error.response.status >= 500 && error.response.status < 600);

const apiCallWithRetry = async (fn, retries = API_CONFIG.RETRY_ATTEMPTS) => {
  try {
    return await fn();
  } catch (err) {
    if (retries > 0 && isRetryableError(err)) {
      if (import.meta.env.DEV) console.log(`Retrying… (${retries} left)`);
      await delay(1000);
      return apiCallWithRetry(fn, retries - 1);
    }
    throw err;
  }
};

// --- request interceptor ---
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) config.headers.Authorization = `Bearer ${token}`;

    if (import.meta.env.DEV) {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- response interceptor ---
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    // Return JSON directly so callers don’t need ".data"
    return response.data;
  },
  (error) => {
    const cfg = error.config;
    if (import.meta.env.DEV) {
      console.error(`❌ ${cfg?.method?.toUpperCase()} ${cfg?.url}`, error);
    }

    if (error.response) {
      const { status, data } = error.response;

      if (status === HTTP_STATUS.UNAUTHORIZED) {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        // Prefer a router redirect in-app; simple fallback:
        window.location.href = '/login';
      }

      const message =
        data?.message ||
        ({
          [HTTP_STATUS.BAD_REQUEST]: 'Dữ liệu không hợp lệ',
          [HTTP_STATUS.UNAUTHORIZED]: 'Không có quyền truy cập',
          [HTTP_STATUS.FORBIDDEN]: 'Truy cập bị từ chối',
          [HTTP_STATUS.NOT_FOUND]: 'Không tìm thấy tài nguyên',
          [HTTP_STATUS.CONFLICT]: 'Dữ liệu đã tồn tại',
          [HTTP_STATUS.INTERNAL_SERVER_ERROR]: ERROR_MESSAGES.API.SERVER_ERROR,
          [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'Dịch vụ tạm thời không khả dụng',
        }[status] || ERROR_MESSAGES.NETWORK.UNKNOWN);

      return Promise.reject({ status, message, data, originalError: error });
    }

    if (error.request) {
      return Promise.reject({
        status: 0,
        message: ERROR_MESSAGES.NETWORK.CONNECTION_ERROR,
        originalError: error,
      });
    }

    return Promise.reject({
      status: 0,
      message: ERROR_MESSAGES.NETWORK.UNKNOWN,
      originalError: error,
    });
  }
);

// --- verb helpers (all with retry) ---
const get = (url, config = {}) => apiCallWithRetry(() => api.get(url, config));
const post = (url, data = {}, config = {}) => apiCallWithRetry(() => api.post(url, data, config));
const put = (url, data = {}, config = {}) => apiCallWithRetry(() => api.put(url, data, config));
const patch = (url, data = {}, config = {}) => apiCallWithRetry(() => api.patch(url, data, config));
const del = (url, config = {}) => apiCallWithRetry(() => api.delete(url, config));

const upload = (url, formData, onProgress) =>
  apiCallWithRetry(() =>
    api.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (evt) => {
        if (onProgress && evt.total) {
          onProgress(Math.round((evt.loaded * 100) / evt.total));
        }
      },
    })
  );

export default api;
export { get, post, put, patch, del, upload, apiCallWithRetry, isRetryableError, delay };
