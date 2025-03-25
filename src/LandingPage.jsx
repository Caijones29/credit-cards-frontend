import logo from './logo.png';
import './App.css';
import './LogoElements.css'
import './LandingPageElements.css'
import './SessionPageElements.css'
import './SessionPage'
import './LoadingPage'
import LoadingPage from "./LoadingPage";
import {useNavigate} from 'react-router-dom';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function LandingPage() {

    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [popupMessage, setPopupMessage] = useState("Welcome!");
    const [FadePopup, setFadePopup] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showInput, setShowInput] = useState(true);
    const popupRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

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
            navigate(`/session/${sessionStorage.getItem('sessionCode')}`);
            setIsLoading(false);
        }, 3000);
    }

    const createSession = async () => {
        try {
            const response = await axios.post('https://credit-cards-f180ee269109.herokuapp.com/session/createNewSession');
            const sessionCode = response.data.sessionCode; // Extract sessionCode from the response

            if (sessionCode != null) {
                sessionStorage.setItem("sessionCode", sessionCode);
                redirectToSession();
            }

        } catch (err) {
            console.log("Error Creating Session")
        }
    }
    
    function redirectToJoin() {
            navigate("/join-existing")
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

        return (
            <>
                {/*Header*/}
                <header className="Header">
                    <img src={logo} className="Logo-spin-flat"/>
                    <div className="Header-wrapper">
                        <h1 className="Header-text">
                            Credit Cards
                        </h1>
                    </div>
                </header>

                {/*Login Popup*/}
                <div className={`Login-popup ${FadePopup ? 'FadePopup' : ''}`} id="loginForm" ref={popupRef}>
                    <form className="form-container">
                        <h1>{popupMessage}</h1>

                        {showInput && (
                            <>
                                <label form="username">
                                    <b>Please enter your username</b>
                                </label>

                                <input type="text" placeholder="e.g. Pokerface100 B-)" name="username" value={username}
                                       onChange={handleNameChange} required/>

                                <button type="submit" className="Submit-username-button" disabled={!username}
                                        onClick={handleSignInClick}>
                                    Submit Username
                                </button>

                                <button type="button" className="Close-popup-button" onClick={closePopup}>Close</button>
                            </>
                        )}
                    </form>
                </div>

                {isLoading ? (
                    <LoadingPage/>
                ) : (
                    /*App Body*/
                    <div className="App-body">
                        <div>
                            <div className="Landing-buttons-container">
                                <button className="Landing-button-component" onClick={createSession}
                                        disabled={!submitted}>
                                    <p>
                                        Create Session
                                    </p>
                                </button>

                                <div className="Button-divider"></div>

                                <button className="Landing-button-component" onClick={redirectToJoin}
                                        disabled={!submitted}>
                                    <p>
                                        Join Session
                                    </p>
                                </button>
                            </div>
                        </div>

                        <div>
                            <button className="Text-button-component" onClick={openPopup}>
                                <p>
                                    {submitted ? "Edit Username" : "Add Username"}
                                </p>
                            </button>
                        </div>
                    </div>
                )}
            </>
        )
    }

export default LandingPage;
