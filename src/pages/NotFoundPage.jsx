import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/', { replace: true }); // Redirect to home page
    };

    return (
        <div className="not-found-page">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <button onClick={handleGoHome} className="go-home-button">
                Go to Home
            </button>
        </div>
    );
};

export default NotFoundPage;