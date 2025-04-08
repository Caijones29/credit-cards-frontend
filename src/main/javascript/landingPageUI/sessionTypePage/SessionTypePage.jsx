import React, {useState} from 'react';
import '../../../css/acrossApp/App.css';
import '../../../css/acrossApp/header.css';
import '../../../css/sessionPageUI/loadingPage/LoadingPageBase.css';
import '../../../css/logo/LogoAnimation.css';
import '../../../css/landingPageUI/sessionTypePage/SessionTypeBase.css';
import closedPadlock from '../../../customImages/padlock/CC Closed Padlock Blank.PNG';
import openPadlock from '../../../customImages/padlock/CC Open Padlock Blank Light.PNG';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import LoadingPage from "../../sessionPageUI/loadingPage/LoadingPage";
import logo from "../../../customImages/logo/logo.png";

function SessionTypePage() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState(sessionStorage.getItem("username"));
    const [isPopupOpen, setIsPopupOpen] = useState(!username); // Open popup if no username

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const createSession = async () => {
        try {
            const response = await axios.post(
                'https://credit-cards-f180ee269109.herokuapp.com/session/createNewSession',
                {}, // No data payload
                {
                    headers: {
                        'isPrivateSession': sessionStorage.getItem("sessionType") || 'false', // Default to false
                        'Content-Type': 'application/json'
                    }
                }
            );
            const sessionCode = response.data.sessionCode;

            if (sessionCode != null) {
                sessionStorage.setItem("sessionCode", sessionCode);
                redirectToSession();
            }
        } catch (err) {
            navigate("/error")
            console.log("Error Creating Session:", err);
        }
    };

    const redirectToSession = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate(`/session/${sessionStorage.getItem('sessionCode')}`);
            setIsLoading(false);
        }, 3000);
    };

    const handleCreateSessionClick = () => {
        if (username) {
            createSession();
        } else {
            openPopup();
        }
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

            {isLoading ? (
                <LoadingPage/>
            ) : (

                <div className="App-body">
                    <div className="Session-type-container">
                        <div className="Open-Padlock" onClick={() => {
                            console.log('Creating Public Session');
                            setIsLoading(true);
                            handleCreateSessionClick(false);
                        }}>
                            <img src={openPadlock} className="Open-padlock-display"/>
                            <p>Public Session</p>
                            <span className="Padlock-subtext">Open to Everyone</span>
                        </div>

                        <div className="Closed-Padlock" onClick={() => {
                            console.log('Creating Private Session');
                            setIsLoading(true);
                            handleCreateSessionClick()
                        }}>
                            <img src={closedPadlock} className="Closed-padlock-display"/>
                            <p>Private Session</p>
                            <span className="Padlock-subtext">Only for Users with Session Code</span>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}

export default SessionTypePage;
