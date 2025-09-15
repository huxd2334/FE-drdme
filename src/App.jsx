
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PatientProvider } from "./contexts/PatientContext";
import { VisitProvider } from "./contexts/VisitContext";
import { AnalysisProvider } from "./contexts/AnalysisContext";
import { CompareProvider } from "./contexts/CompareContext";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./layouts/AppLayout";
import { ROUTES } from "./utils/constants";
import HomePage from "./pages/HomePage";
import AnalysisPage from "./pages/AnalysisPage";

function AppProviders({ children }) {
  return (
    <PatientProvider>
      <VisitProvider>
        <AnalysisProvider>
          <CompareProvider>{children}</CompareProvider>
        </AnalysisProvider>
      </VisitProvider>
    </PatientProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />

          {/* Protected layout */}
          <Route
            element={
              <ProtectedRoute>
                <AppProviders>
                  <AppLayout />
                </AppProviders>
              </ProtectedRoute>
            }
          >
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.ANALYSIS} element={<AnalysisPage />} />
          </Route>

          <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
