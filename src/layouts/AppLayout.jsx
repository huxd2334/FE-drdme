import React, { Suspense, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import { ROUTES } from '../utils/constants';
import Header from './Header';
import "./styles.css";

const AppLayout = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    AuthService.logout();
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  const isAuthenticated = AuthService.isAuthenticated();

  return (
    <div className="app">
      <Header
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      <main className="main">
        <div className="container">
          <Suspense fallback={<div className="loader">Loading…</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} VKU Inventory Management</span>
      </footer>
    </div>
  );
};

export default AppLayout;
