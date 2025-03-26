import React from 'react';
import logo from './logo.png';
import './App.css';
import './LoadingPage.css';
import './LogoElements.css'

function LoadingPage() {
    return (
        <div className="loading-container">
            <div className="Logo-spin-3d">
                <img src={logo} className="Logo-spin-3d"/>
            </div>
            <p>Loading Session...</p>
        </div>
    );
}

export default LoadingPage;

