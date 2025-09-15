// src/pages/LoginPage.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import './login_styles.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = () => {
    navigate('/', { replace: true });
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-left">
      <h2 className="login-campaign">Hệ thống quản lý khám & chẩn đoán võng mạc tiểu đường</h2>
        <img src="/logo1.png" alt="Eye Health" className="login-illustration" />

      </div>

      <div className="login-right">
        <div className="login-box">
          <div className="login-header">
            <h1 className="system-title">Đăng nhập</h1>
          </div>

          <LoginForm onSuccess={handleLoginSuccess} />

          <div className="login-footer">
            <span>Quên mật khẩu?</span>
            <p className="copyright">
              © {new Date().getFullYear()} – For authorized doctors only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
