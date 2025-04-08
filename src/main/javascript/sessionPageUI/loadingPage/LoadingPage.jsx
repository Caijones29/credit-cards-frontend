import React from 'react';
import logo from '../../../customImages/logo/logo.png';
import '../../../css/acrossApp/App.css';
import '../../../css/acrossApp/header.css';
import '../../../css/sessionPageUI/loadingPage/LoadingPageBase.css';
import '../../../css/logo/LogoAnimation.css'

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

