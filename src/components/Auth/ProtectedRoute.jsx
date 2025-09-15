import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../utils/constants';

const ProtectedRoute = ({ children, fallback = null }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">Loading...</div>
                <style>
                    {`
                        .loading-container {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            min-height: 100vh;
                        }
                        .loading-spinner {
                            padding: 2rem;
                            font-size: 1.1rem;
                            color: #666;
                        }
                    `}
                </style>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate to={ROUTES.LOGIN} replace />
        );
    }

    return children || <Outlet />;
};

export default ProtectedRoute;
