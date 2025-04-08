import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ErrorPage.css';

const ErrorPage = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <h1 className="heading">Oops!</h1>
            <p className="message">There was a problem, please try again later.</p>
            <button className="button" onClick={goToHome}>
                Go to Home
            </button>
        </div>
    );
};

export default ErrorPage;
