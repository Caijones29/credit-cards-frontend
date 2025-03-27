import logo from './logo.png';
import './App.css';
import './LogoElements.css'
import './LandingPageElements.css'
import './SessionPageElements.css'
import './JoinPageElements.css'
import './SessionPage'
import './LoadingPage';
import LoadingPage from "./LoadingPage";
import {Link, useNavigate} from 'react-router-dom';
import React, {useState} from "react";
import {useEffect} from "react";


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

                    <label form="sessionCode">
                        <b>Please enter the Session Code</b>
                    </label>

                    <input type="text" placeholder="e.g. v0t1N" name="sessionCode" value={sessionCode} onChange={handleSessionCodeChange} required/>

                    <button type="submit" className="Join-session-button" disabled={!sessionCode}>
                        Join Session
                    </button>

                    <button type="button" className="Go-back-button" onClick={redirectToLanding}>
                        Back
                    </button>
                </form>
            </div>
            )}
        </>
    );
}

export default JoinPage;