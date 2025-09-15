import { get, post, put, del, patch } from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * CategoryService: đóng gói toàn bộ API cho categories.
 */
export const CategoryService = {
  list: (params) => get(API_ENDPOINTS.CATEGORIES, { params }),
  get: (id) => get(`${API_ENDPOINTS.CATEGORIES}/${id}`),
  create: (payload) => post(API_ENDPOINTS.CATEGORIES, payload),
  update: (id, payload) => patch(`${API_ENDPOINTS.CATEGORIES}/${id}`, payload),
  remove: (id) => del(`${API_ENDPOINTS.CATEGORIES}/${id}`),
};