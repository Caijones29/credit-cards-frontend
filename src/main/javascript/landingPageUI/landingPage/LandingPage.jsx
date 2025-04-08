import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../customImages/logo/logo.png';
import '../../../css/acrossApp/App.css';
import '../../../css/acrossApp/header.css';
import '../../../css/logo/LogoAnimation.css';
import LoadingPage from '../../sessionPageUI/loadingPage/LoadingPage';
import LogInPopUp from './LogInPopUp';

function LandingPage() {
    const [username, setUsername] = useState(sessionStorage.getItem("username"));
    const [isPopupOpen, setIsPopupOpen] = useState(!username); // Open popup if no username
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };


    const redirectToJoin = () => {
        navigate("/join-existing");
    };

    const redirectToSessionType = () => {
            navigate(`/session-type`);
    };


    return (
        <>
            <header className="Header">
                <img src={logo} className="Logo-spin-flat" alt="Logo" />
                <div className="Header-wrapper">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h1 className="Header-text">
                            Credit Cards
                        </h1>
                    </Link>
                    <span className="Header-subtext">
                        Planning Poker
                    </span>
                </div>
            </header>

            {isPopupOpen && (
                <LogInPopUp onClose={closePopup} />
            )}

            {isLoading ? (
                <LoadingPage />
            ) : (
                <div className="App-body">
                    <div className="Landing-buttons-container">
                        <button
                            className="Landing-button-component"
                            onClick={redirectToSessionType}
                        >
                            <p>
                                Create Session
                            </p>
                        </button>

                        <div className="Button-divider"></div>

                        <button
                            className="Landing-button-component"
                            onClick={redirectToJoin}
                        >
                            <p>
                                Join Session
                            </p>
                        </button>
                    </div>

                    <div>
                        <button
                            className="Text-button-component"
                            onClick={openPopup}
                        >
                            <p>
                                {"Edit Username and Avatar"}
                            </p>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default LandingPage;
