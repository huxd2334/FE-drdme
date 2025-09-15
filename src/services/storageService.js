/**
 * storageService
 * - Quản lý dữ liệu cục bộ (localStorage) cho mock app
 * - Dùng prefix để tránh đụng key
 */

const PREFIX = "drapp_";

function getKey(key) {
  return `${PREFIX}${key}`;
}

export const storageService = {
  get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(getKey(key));
      if (!raw) return defaultValue;
      return JSON.parse(raw);
    } catch (err) {
      console.error("storageService.get error:", err);
      return defaultValue;
    }
  },

  /**
   * Ghi dữ liệu vào localStorage
   */
  set(key, value) {
    try {
      localStorage.setItem(getKey(key), JSON.stringify(value));
    } catch (err) {
      console.error("storageService.set error:", err);
    }
  },

  /**
   * Xóa key
   */
  remove(key) {
    localStorage.removeItem(getKey(key));
  },

  /**
   * Xóa toàn bộ dữ liệu có prefix
   */
  clearAll() {
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith(PREFIX)) localStorage.removeItem(k);
    });
  },
};
