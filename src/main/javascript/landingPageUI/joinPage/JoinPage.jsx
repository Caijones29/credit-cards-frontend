import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../customImages/logo/logo.png';
import '../../../css/acrossApp/App.css';
import '../../../css/acrossApp/header.css';
import '../../../css/logo/LogoAnimation.css'
import '../../../css/landingPageUI/joinPage/JoinPageBase.css'
import '../../sessionPageUI/sessionPage/SessionPage'
import '../../sessionPageUI/loadingPage/LoadingPage';
import LoadingPage from "../../sessionPageUI/loadingPage/LoadingPage";
import SessionDetailsList from "../../landingPageUI/joinPage/ShowSessionList";

function JoinPage() {
    const navigate = useNavigate();
    const [sessionCode, setSessionCode] = useState("");
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function redirectToLanding() {
        navigate("/");
    }

    const redirectToSession = (event) => {
        event.preventDefault();
        if (sessionCode) {
            setIsLoading(true);
            setTimeout(() => {
                navigate(`/session/${sessionCode}`);
                setIsLoading(false);
            }, 3000);
        } else {
            alert("Please enter a SessionCode to join an existing session");
        }
    };

    const handleSessionCodeChange = (event) => {
        setSessionCode(event.target.value);
    };

    const handleSessionSelect = (code) => {
        setSessionCode(code);
    };

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

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
                <LoadingPage />
            ) : (
                <div className="App-body">
                    <form className="form-container" onSubmit={redirectToSession}>
                        <h1>Hello {username}!</h1>

                        <div className="join-session-wrapper">

                            <div className="session-list">
                                <p>Join a live Session</p>
                                <SessionDetailsList onSelectSession={handleSessionSelect} />
                            </div>

                            <div className="manual-join">
                                <label htmlFor="sessionCode">
                                    <b>Enter a Session Code</b>
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. v0t1N"
                                    name="sessionCode"
                                    value={sessionCode}
                                    onChange={handleSessionCodeChange}
                                    required
                                />

                                <button type="submit" className="Join-session-button" disabled={!sessionCode}>
                                    Join Session
                                </button>

                                <button type="button" className="Go-back-button" onClick={redirectToLanding}>
                                    Back
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default JoinPage;
