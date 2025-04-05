import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import './App.css';
import './LogoElements.css';
import './LandingPageElements.css';
import './SessionPageElements.css';
import LoadingPage from './LoadingPage';
import LogInPopUp from "./LogInPopUp";

function LandingPage() {
    const [username, setUsername] = useState(sessionStorage.getItem("username"));
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const createSession = async () => {
        try {
            const response = await axios.post('https://credit-cards-f180ee269109.herokuapp.com/session/createNewSession');
            const sessionCode = response.data.sessionCode;

            if (sessionCode != null) {
                sessionStorage.setItem("sessionCode", sessionCode);
                redirectToSession();
            }
        } catch (err) {
            console.log("Error Creating Session");
        }
    };

    const redirectToJoin = () => {
        navigate("/join-existing");
    };

    const redirectToSession = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate(`/session/${sessionStorage.getItem('sessionCode')}`);
            setIsLoading(false);
        }, 3000);
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

            {(username === null || isPopupOpen) && (
                <LogInPopUp onClose={closePopup} />
            )}

            {isLoading ? (
                <LoadingPage />
            ) : (
                <div className="App-body">
                    <div className="Landing-buttons-container">
                        <button
                            className="Landing-button-component"
                            onClick={createSession}
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
