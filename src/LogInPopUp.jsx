import React, {useEffect, useRef, useState} from "react";
import AvatarPreview from "./AvatarPreview";
import emptyBaseAvatar from "./avatarCreationImages/Bases/emptyBaseAvatar.png";
import AvatarCustomiserPopUp from "./AvatarCustomiserPopUp";
import { v4 as uuidv4 } from 'uuid';
import {defaultAvatarObject} from "./avatarObject";

const LogInPopUp = ({ onClose }) => {
    const [avatarObject, setAvatarObject] = useState(() => {
        const savedAvatar = sessionStorage.getItem("avatar");
        return savedAvatar ? JSON.parse(savedAvatar) : { ...defaultAvatarObject };
    });


    useEffect(() => {
        const handleAvatarUpdate = () => {
            const savedAvatar = sessionStorage.getItem("avatar");
            if (savedAvatar) {
                setAvatarObject(JSON.parse(savedAvatar));
                console.log("Updated avatarObject in LogInPopUp:", JSON.parse(savedAvatar));
            }
        };

        window.addEventListener('avatarUpdated', handleAvatarUpdate);

        return () => window.removeEventListener('avatarUpdated', handleAvatarUpdate);
    }, []);



    const [username, setUserName] = useState(sessionStorage.getItem("username") || "");
    const [popupMessage, setPopupMessage] = useState("Welcome!");
    const [fadePopup, setFadePopup] = useState(false);
    const [showInput, setShowInput] = useState(true);
    const popupRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [avatarCustomiserVisible, setAvatarCustomiserVisible] = useState(false);

    const closePopup = () => {
        setFadePopup(false);
        setPopupMessage("Welcome!");
        setUserName("");
        if (popupRef.current) {
            popupRef.current.classList.remove("FadePopup");
            popupRef.current.style.display = "none";
        }
        onClose();
    };

    const handleSignInClick = (event) => {
        event.preventDefault();
        setPopupMessage(`Hello ${username}!`);
        setFadePopup(true);
        setShowInput(false);

        const myuuid = saveUUID();

        sessionStorage.setItem("username", username);
        sessionStorage.setItem("userID", myuuid);

        setTimeout(() => {
            closePopup();
        }, 1500);
    };

    const saveUUID = () => {
        let myuuid = uuidv4();
        console.log('Your UUID is: ' + myuuid);
        sessionStorage.setItem("userID", myuuid);
        return myuuid;
    };

    const handleNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleAvatarClick = () => {
        setAvatarCustomiserVisible(true);
    };

    const handleBackToLogin = () => {
        setAvatarCustomiserVisible(false);
    };

    return (
        <>
            {!avatarCustomiserVisible && (
                <div className={`Login-popup ${fadePopup ? 'FadePopup' : ''}`} id="loginForm" ref={popupRef}>
                    <form className="form-container">
                        <h1>{popupMessage}</h1>

                        {/* Avatar display */}
                        {showInput && (
                            <div
                                className="Avatar-container"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={handleAvatarClick}
                            >
                                <div>
                                    {avatarObject ? (
                                        <AvatarPreview avatarObject={avatarObject} />
                                    ) : (
                                        <img
                                            src={emptyBaseAvatar}
                                            alt="Avatar"
                                            className="Avatar-image"
                                        />
                                    )}
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
                            </>
                        )}
                    </form>
                </div>
            )}

            {avatarCustomiserVisible && (
                <AvatarCustomiserPopUp closePopup={handleBackToLogin} />
            )}
        </>
    );
};

export default LogInPopUp;
