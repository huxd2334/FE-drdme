// API Config
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  TIMEOUT: 10000,
};

// API Endpoints (có thể thay đổi khi có backend thật)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
  },
  PATIENTS: "/patients",
  VISITS: "/visits",
  IMAGES: "/images",
  ANALYSES: "/analyses",
  COMPARE: "/compare",
};

// Routes trong app
export const ROUTES = {
  LOGIN: "/login",
  HOME: "/home",
  ANALYSIS: "/analysis",
  HISTORY: "/history",
  COMPARE: "/compare",
  NOT_FOUND: "/404",
};

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  USER_INFO: "user_info",
  PATIENTS: "patients",
  VISITS: "visits",
  IMAGES: "images",
  ANALYSES: "analyses",
};

// Status chung
export const LOADING_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

// Validation Rules (mock)
export const VALIDATION_RULES = {
  PATIENT: {
    NAME: { MIN_LENGTH: 1, MAX_LENGTH: 100 },
  },
  VISIT: {
    NOTE: { MAX_LENGTH: 255 },
  },
};

export const THEME = {
  COLORS: {
    PRIMARY: "#3b82f6", // xanh
    SUCCESS: "#10b981", // xanh lá
    WARNING: "#f59e0b", // vàng
    ERROR: "#ef4444",   // đỏ
  },
};

// Date/Time formats
export const DATE_FORMATS = {
  DISPLAY: "DD/MM/YYYY",
  DISPLAY_WITH_TIME: "DD/MM/YYYY HH:mm",
};
