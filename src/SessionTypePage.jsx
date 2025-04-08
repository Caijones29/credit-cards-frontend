import React, {useState} from 'react';
import './App.css';
import './LoadingPage.css';
import './LogoElements.css';
import './SessionTypePage.css';
import closedPadlock from './CC Closed Padlock Blank.PNG';
import openPadlock from './CC Open Padlock Blank Light.PNG';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import LoadingPage from "./LoadingPage";
import logo from "./logo.png";

function SessionTypePage() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const createSession = async (isPrivate) => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:8080/session/createNewSession',
                {},
                {
                    headers: {
                        'privateSession': isPrivate,
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
            console.log("Error Creating Session")
        }
    }

    function redirectToSession() {
        setIsLoading(true);
        setTimeout(() => {
            navigate(`/session/${sessionStorage.getItem('sessionCode')}`);
            setIsLoading(false);
        }, 3000);
    }

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
                            createSession(false);
                        }}>
                            <img src={openPadlock} className="Open-padlock-display"/>
                            <p>Public Session</p>
                            <span className="Padlock-subtext">Open to Everyone</span>
                        </div>

                        <div className="Closed-Padlock" onClick={() => {
                            console.log('Creating Private Session');
                            createSession(true);
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
