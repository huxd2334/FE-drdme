// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import authService from '../services/authService';

// ---- Helpers ---------------------------------------------------------------
function decodeJwt(token) {
  try {
    const [, payload] = token.split('.');
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const json = decodeURIComponent(
      atob(padded)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function isPayloadExpired(payload) {
  if (!payload?.exp) return false;
  const exp = Number(payload.exp);
  const expMs = exp < 1e11 ? exp * 1000 : exp;
  return Date.now() >= expMs;
}

const TOKEN_KEY = 'access_token';
const USER_KEY = 'current_user';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);           // { id, role, name, email, doctorId }
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      const token = authService.getToken(); // đọc từ localStorage
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const payload = decodeJwt(token);
      if (!payload || isPayloadExpired(payload)) {
        // token hỏng/hết hạn → đăng xuất
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const raw = localStorage.getItem(USER_KEY);
      let hydrated = null;
      try { hydrated = raw ? JSON.parse(raw) : null; } catch { hydrated = null; }

      const mergedUser = {
        id: hydrated?.id ?? payload?.userId ?? payload?.id ?? payload?.sub ?? null,
        role: hydrated?.role ?? payload?.role ?? null,
        name: hydrated?.name ?? payload?.username ?? payload?.name ?? null,
        email: hydrated?.email ?? payload?.email ?? null,
        doctorId: hydrated?.doctorId ?? payload?.doctorId ?? null,
      };

      setUser(mergedUser);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Error checking auth status:', err);
      authService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 2) Đăng nhập bằng mock service
  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const res = await authService.login(credentials); // { success, token, user }
      if (res?.success) {
        setIsAuthenticated(true);
        // user từ service đã gọn gàng: { id, role, name, email, doctorId }
        setUser(res.user);
        return { success: true, user: res.user };
      }
      return { success: false, error: res?.error || 'Đăng nhập thất bại' };
    } catch (error) {
      return { success: false, error: error?.message || 'Đăng nhập thất bại' };
    } finally {
      setIsLoading(false);
    }
  };

  // 3) Đăng xuất
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // 4) Tiện ích: lấy role/kiểm tra quyền
  const getRole = () => user?.role || null;
  const hasRole = (roles) => (Array.isArray(roles) ? roles : [roles]).includes(user?.role);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      getRole,
      hasRole,
      refreshAuth: checkAuthStatus,
    }),
    [user, isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
