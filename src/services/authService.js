import { findUserByIdentifier } from '../utils/mock_data';


function generateMockToken(payload, expiresInMinutes = 120) {
  const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
  const exp = Date.now() + expiresInMinutes * 60 * 1000;
  const body = btoa(JSON.stringify({ ...payload, exp }));
  const signature = "mock-signature";
  return `${header}.${body}.${signature}`;
}

function parseMockToken(token) {
  try {
    const [, body] = token.split(".");
    return JSON.parse(atob(body));
  } catch {
    return null;
  }
}

class AuthService {
  /**
   * credentials = { identifier: 'DR10023' | 'dr.binh@hospital.vn' | 'admin', password: '...' }
   * Trả về: { success, token, user, message }
   */
  async login(credentials) {
    const { identifier, password } = credentials || {};
    await new Promise(r => setTimeout(r, 500));

    if (!identifier || !password) {
      return { success: false, error: "Vui lòng nhập đầy đủ thông tin." };
    }

    const user = findUserByIdentifier(identifier);
    if (!user || user.password !== password) {
      return { success: false, error: "Sai tài khoản hoặc mật khẩu." };
    }
    if (user.active === false) {
      return { success: false, error: "Tài khoản đã bị khóa. Vui lòng liên hệ quản trị." };
    }

    const token = generateMockToken({
      sub: user.id,
      role: user.role,
      name: user.name,
      email: user.email || null,
      doctorId: user.doctorId || null,
    });

    localStorage.setItem("access_token", token);
    localStorage.setItem("current_user", JSON.stringify({
      id: user.id, role: user.role, name: user.name,
      email: user.email || null, doctorId: user.doctorId || null,
    }));

    return {
      success: true,
      token,
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email || null,
        doctorId: user.doctorId || null,
      },
      message: "Đăng nhập thành công (mock).",
    };
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("current_user");
  }

  getToken() {
    return localStorage.getItem("access_token");
  }

  getCurrentUser() {
    const raw = localStorage.getItem("current_user");
    try { return raw ? JSON.parse(raw) : null; } catch { return null; }
  }

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    const decoded = parseMockToken(token);
    if (!decoded || !decoded.exp) return false;
    return Date.now() < decoded.exp;
  }

  getRole() {
    const u = this.getCurrentUser();
    return u?.role || null;
  }
}

export default new AuthService();
