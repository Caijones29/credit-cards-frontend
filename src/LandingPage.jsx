import React, { useState, useRef } from 'react';
import logo from './logo.png';
import emptyBaseAvatar from './avatarCreationImages/Bases/emptyBaseAvatar.png';
import './App.css';
import './LogoElements.css';
import './LandingPageElements.css';
import './SessionPageElements.css';
import './SessionPage';
import './LoadingPage';
import LoadingPage from './LoadingPage';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AvatarCustomiserPopUp from './AvatarCustomiserPopUp.jsx';
import AvatarPreview from "./AvatarPreview";

function LandingPage() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [popupMessage, setPopupMessage] = useState("Welcome!");
    const [FadePopup, setFadePopup] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showInput, setShowInput] = useState(true);
    const popupRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [avatarCustomiserVisible, setAvatarCustomiserVisible] = useState(false);

    function closePopup() {
        setFadePopup(false);
        setPopupMessage("Welcome!");
        setUserName("");
        if (popupRef.current) {
            popupRef.current.classList.remove("FadePopup");
            popupRef.current.style.display = "none";
        }
    }

    function openPopup() {
        setShowInput(true);
        if (popupRef.current) {
            popupRef.current.style.display = "initial";
        }
    }

    function redirectToSession() {
        setIsLoading(true);
        setTimeout(() => {
            navigate("/poker-table");
            setIsLoading(false);
        }, 3000);
    }

    function redirectToJoin() {
        navigate("/join-existing");
    }

    const handleNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleSignInClick = (event) => {
        event.preventDefault();
        setPopupMessage(`Hello ${username}!`);
        setFadePopup(true);
        setSubmitted(true);
        setShowInput(false);

        const myuuid = saveUUID();
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("userID", myuuid);

        setTimeout(() => {
            closePopup();
        }, 1500);
    };

    function saveUUID() {
        let myuuid = uuidv4();
        console.log('Your UUID is: ' + myuuid);
        sessionStorage.setItem("userID", myuuid);
        return myuuid;
    }

    const handleAvatarClick = () => {
        setAvatarCustomiserVisible(true);
    };

    const handleBackToLogin = () => {
        setAvatarCustomiserVisible(false);
    };

    const avatarObject = sessionStorage.getItem("avatar")

    return (
        <>
            {/* Header */}
            <header className="Header">
                <img src={logo} className="Logo-spin-flat" alt="Logo" />
                <div className="Header-wrapper">
                    <h1 className="Header-text">Credit Cards</h1>
                </div>
            </header>

            {/* Login Popup */}
            {!avatarCustomiserVisible && (
                <div className={`Login-popup ${FadePopup ? 'FadePopup' : ''}`} id="loginForm" ref={popupRef}>
                    <form className="form-container">
                        <h1>{popupMessage}</h1>

                        {/* Avatar display */}
                        {showInput && (
                            <div
                                className="Avatar-container"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={handleAvatarClick} // Add onClick handler
                            >
                                <div>
                                    {avatarObject ? (
                                        <AvatarPreview avatarObject={JSON.parse(sessionStorage.getItem("avatar"))} />
                                    ) : (
                                        <img
                                            src={emptyBaseAvatar}
                                            alt="Avatar"
                                            className="Avatar-image"
                                        />                                    )}
                                </div>
                                {isHovered && <div className="Avatar-tooltip">Edit Avatar</div>}
                            </div>
                        )}

                        {showInput && (
                            <>
                                <label htmlFor="username">
                                    <b>Please enter your username</b>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Pokerface100 B-)"
                                    name="username"
                                    value={username}
                                    onChange={handleNameChange}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="Submit-username-button"
                                    disabled={!username}
                                    onClick={handleSignInClick}
                                >
                                    Submit Username
                                </button>
                                <button
                                    type="button"
                                    className="Close-popup-button"
                                    onClick={closePopup}
                                >
                                    Close
                                </button>
                            </>
                        )}
                    </form>
                </div>
            )}

            {/* Avatar Customiser Pop-up */}
            {avatarCustomiserVisible && (
                <AvatarCustomiserPopUp closePopup={handleBackToLogin} />
            )}

            {isLoading ? (
                <LoadingPage />
            ) : (
                <div className="App-body">
                    <div>
                        <div className="Landing-buttons-container">
                            <button
                                className="Landing-button-component"
                                onClick={redirectToSession}
                                disabled={!submitted}
                            >
                                <p>Create Session</p>
                            </button>

                            <div className="Button-divider"></div>

                            <button
                                className="Landing-button-component"
                                onClick={redirectToJoin}
                                disabled={!submitted}
                            >
                                <p>Join Session</p>
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            className="Text-button-component"
                            onClick={openPopup}
                        >
                            <p>{submitted ? "Edit Username and Avatar" : "Add Username and Customise Avatar"}</p>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default LandingPage;
