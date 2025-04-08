import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import {Link, useNavigate, useParams} from 'react-router-dom';
import logo from '../../../customImages/logo/logo.png';
import closedPadlock from '../../../customImages/padlock/CC Closed Padlock Blank.PNG';
import openPadlock from '../../../customImages/padlock/CC Open Padlock Blank Light.PNG';
import '../../../css/acrossApp/App.css';
import '../../../css/acrossApp/header.css';
import '../../../css/logo/LogoAnimation.css';
import '../../../css/landingPageUI/landingPage/LandingPageBase.css';
import '../../../css/landingPageUI/landingPage/LoginPopup.css';
import '../../../css/landingPageUI/landingPage/AvatarCustomiserContainer.css';
import '../../../css/sessionPageUI/sessionPage/SessionPageBase.css';
import '../../../css/sessionPageUI/sessionPage/SessionCodeDisplay.css';
import '../../../css/sessionPageUI/sessionPage/SessionTypeDisplay.css';
import '../../../css/sessionPageUI/sessionPage/VotingButtons.css';
import '../../../css/sessionPageUI/sessionPage/RevealButton.css';
import '../../../css/sessionPageUI/sessionPage/ResetButton.css';
import '../../../css/sessionPageUI/sessionPage/AveragesDisplay.css';
import '../../../css/sessionPageUI/sessionPage/AveragesContainers.css';
import '../../../css/sessionPageUI/sessionPage/SessionPageWelcomePopup.css';
import LogInPopUp from "../../landingPageUI/landingPage/LogInPopUp";
import AvatarPreview from "../../avatars/avatarPreview/AvatarPreview";

function SessionPage() {
    const [selected, setSelected] = useState(null);
    const [showEstimates, setShowEstimates] = useState(false);
    const [username, setUsername] = useState('');
    const [showWelcome, setShowWelcome] = useState(true);
    const [modeValue, setModeValue] = useState('');
    const [showMode, setShowMode] = useState(false);
    const [meanValue, setMeanValue] = useState('');
    const [showMean, setShowMean] = useState(false);
    const [medianValue, setMedianValue] = useState('');
    const [showMedian, setShowMedian] = useState(false);
    const [resetEstimates, setResetEstimates] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [estimate, setEstimate] = useState("");
    const [isLocked, setIsLocked] = useState(false);
    const [lockNotification, setLockNotification] = useState('');
    const [users, setUsers] = useState([]);
    const stompClientRef = useRef(null);
    const { sessionCode } = useParams();
    const [copyNotification, setCopyNotification] = useState('');
    const [votedUsers, setVotedUsers] = useState({});
    const [displayVote, setDisplayVote] = useState("?");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();

    const closePopup = () => {
        setIsPopupOpen(false);
        sendMessage();
    };

    sessionStorage.setItem('sessionCode', sessionCode);
    const userID = sessionStorage.getItem('userID');

    useEffect(() => {
        if (userID == null || username == null) {
            setIsPopupOpen(true);
        }
    }, [userID, username]);

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }

        setTimeout(() => {
            setShowWelcome(false);
        }, 1500);
    }, []);

    useEffect(() => {
        const socket = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: function (str) {
                console.log(str);
            },
            onConnect: function (frame) {
                console.log('Connected: ' + frame);
                stompClient.subscribe(`/session/details/${sessionCode}`, function (message) {
                    console.log('Received: ' + message.body);
                    try {
                        const receivedData = JSON.parse(message.body);
                        console.log(receivedData);

                        if(receivedData.errorMessage){
                            navigate("/error")
                        }
                        if (receivedData.participants) {
                            console.log("Participants data:", receivedData.participants);
                            setUsers(receivedData.participants);

                            const updatedVotedUsers = {};
                            receivedData.participants.forEach(participant => {
                                if (participant.estimate) {
                                    updatedVotedUsers[participant.userID] = true;
                                }
                            });
                            setVotedUsers(updatedVotedUsers);
                        }

                        if (receivedData.showEstimates === true) {
                            setShowEstimates(receivedData.showEstimates);
                            handleRevealVotes();
                        }
                        if (receivedData.resetEstimates === true) {
                            handleResetVotingFromOthers();
                        }

                        setMeanValue(receivedData.sessionAverages.mean);
                        setModeValue(receivedData.sessionAverages.mode);
                        setMedianValue(receivedData.sessionAverages.median);

                    } catch (error) {
                        console.error('Error parsing message body as JSON:', error);
                    }
                });
                sendMessage();
            },
        });

        stompClientRef.current = stompClient;
        stompClient.activate();

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate(() => {
                    console.log('Disconnected from WebSocket server');
                });
            }
        };
    }, [sessionCode]);

    useEffect(() => {
        if (resetEstimates) {
            handleResetVotingFromOthers();
            setResetEstimates(false);
        }
    }, [resetEstimates]);

    useEffect(() => {
        if (showEstimates || estimate || resetEstimates) {
            sendMessage();
        }
    }, [showEstimates, estimate, resetEstimates]);

    const handleRadioChange = (event) => {
        console.log("Radio button ", event.target.value, "  clicked!");
        setSelected(event.target.value);
        setEstimate(event.target.value);
        setDisplayVote(event.target.value);
    };

    const handleResetVoting = () => {
        setSelected(null);
        setShowEstimates(false);
        setResetEstimates(true);
        setShowMode(false);
        setShowMean(false);
        setShowMedian(false);
        setModeValue('');
        setMeanValue('');
        setMedianValue('');
        setFadeIn(false);
        setDisplayVote("?");
    };

    const handleResetVotingFromOthers = () => {
        setSelected(null);
        setShowEstimates(false);
        setResetEstimates(false);
        setShowMode(false);
        setShowMean(false);
        setShowMedian(false);
        setModeValue('');
        setMeanValue('');
        setMedianValue('');
        setFadeIn(false);
        setEstimate('');
        setVotedUsers({});
        setDisplayVote("?");
        console.log('Session has been reset by another user');
    };

    const handleRevealVotes = () => {
        setShowEstimates(true);
        setShowMode(true);
        setShowMean(true);
        setShowMedian(true);
        setFadeIn(true);
    };

    const sendMessage = () => {
        const sessionRequest = {
            showEstimates: showEstimates,
            resetEstimates: resetEstimates,
            sessionCode: sessionCode,
            privateSession: isLocked,
            participant: {
                userName: sessionStorage.getItem('username'),
                userID: sessionStorage.getItem('userID'),
                estimate: estimate,
                avatar: sessionStorage.getItem("avatar")
            }
        };

        if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.publish({
                destination: `/app/session/info/${sessionCode}`,
                body: JSON.stringify(sessionRequest),
                headers: {
                    'sessionCode': sessionRequest.sessionCode,
                    'userID': sessionRequest.participant.userID
                }
            });
            console.log('Message sent: ', sessionRequest);
        } else {
            console.error('STOMP client is not connected');
        }
    };

    const disconnect = () => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate(() => {
                console.log('Disconnected from WebSocket server');
            });
        }
    };

    const handleCopySessionCode = async () => {
        try {
            await navigator.clipboard.writeText(sessionCode);
            setCopyNotification('Session code copied to clipboard!');
            setTimeout(() => {
                setCopyNotification('');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            setCopyNotification('Failed to copy session code. Please try again.');
            setTimeout(() => {
                setCopyNotification('');
            }, 2000);
        }
    };

    const toggleLock = () => {
        const newLockState = !isLocked;
        setIsLocked(newLockState);

        const lockStatusMessage = newLockState ? 'Session is now Private' : 'Session is now Public';
        setLockNotification(lockStatusMessage);

        setTimeout(() => {
            setLockNotification('');
        }, 2000);

        sendMessage();
    };

    const dynamicPositions = (userCount) => {
        const positions = [];
        const radiusX = 52;
        const radiusY = 60;
        const centerX = 50;
        const centerY = 54;
        const startAngle = Math.PI / 1.5;
        const minSpacing = 20;

        const availableAngle = 360 - minSpacing;

        for (let i = 0; i < userCount; i++) {
            const angleDegrees = startAngle * (180 / Math.PI) + (i / userCount) * availableAngle;
            const angleRadians = angleDegrees * (Math.PI / 180);
            const top = centerY + radiusY * Math.sin(angleRadians);
            const left = centerX + radiusX * Math.cos(angleRadians);
            positions.push({
                top: `${top}%`,
                left: `${left}%`,
                transform: 'translate(-50%, -50%)',
            });
        }
        return positions;
    };

    return (
        <>
            <header className="Header">
                <img src={logo} className="Logo-spin-flat" alt="Logo" />
                <div className="Header-wrapper">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h1 className="Header-text">Credit Cards</h1>
                    </Link>
                    <span className="Header-subtext">Planning Poker</span>
                </div>

                <div className="Session-code-display">
                    <span className="Session-code-label">Session Code:</span>
                    <span className="Session-code-value" onClick={handleCopySessionCode} title="Click to Copy">{sessionCode}</span>
                </div>

                <div className="Padlock-icon-container">
                    <img
                        src={isLocked ? closedPadlock : openPadlock}
                        alt="Padlock"
                        className={`Padlock-icon ${isLocked ? 'Closed-padlock' : 'Open-padlock'}`}
                        onClick={toggleLock}
                    />
                </div>
            </header>

            {isPopupOpen && <LogInPopUp onClose={closePopup} />}

            {showWelcome && <div className="Welcome-popup">Welcome, {username}!</div>}

            <div className="App-body">
                {copyNotification && <div className="Copy-notification">{copyNotification}</div>}
                {lockNotification && <div className="Lock-notification">{lockNotification}</div>}

                <div className="Poker-table-container">
                    <button className="Reset-voting-button" onClick={handleResetVoting}>Reset Voting</button>
                    <div className="Poker-table">
                        {!showEstimates && (
                            <button className="Reveal-submitted-votes-button" onClick={handleRevealVotes}>
                                Reveal Votes
                            </button>
                        )}

                        <div className={`Vote-average-container ${fadeIn ? 'fade-in' : ''}`}>
                            <div className="Mean-vote-average-container" style={{ display: showMean ? 'flex' : 'none' }}>
                                <div className="Mean-vote-average">{meanValue}</div>
                                <div className="Mean-vote-average-text">Vote Average</div>
                            </div>

                            <div className="Mode-vote-average-container" style={{ display: showMode ? 'flex' : 'none' }}>
                                <div className="Mode-vote-average">{modeValue}</div>
                                <div className="Mode-vote-average-text">Most Common Vote</div>
                            </div>

                            <div className="Median-vote-average-container" style={{ display: showMedian ? 'flex' : 'none' }}>
                                <div className="Median-vote-average">{medianValue}</div>
                                <div className="Median-vote-average-text">Meet in the Middle?</div>
                            </div>
                        </div>

                        <div className="Submitted-vote-card-container">
                            <div className="Submitted-vote-card">{displayVote}</div>
                            <div className="Submitted-vote-card-text">Your Vote</div>
                        </div>

                        {users.filter(user => user.userID !== sessionStorage.getItem('userID')).map((user, index) => {
                            const positions = dynamicPositions(users.length - 1);
                            if (!positions || positions.length === 0 || index >= positions.length) return null;

                            const position = positions[index % positions.length];
                            let avatarObject;
                            try {
                                avatarObject = JSON.parse(user.avatar);
                            } catch (e) {
                                console.error('Error parsing avatar JSON:', e);
                                avatarObject = {};
                            }

                            return (
                                <div
                                    key={user.userID}
                                    className="Submitted-vote-card-container"
                                    style={{
                                        top: position.top,
                                        left: position.left,
                                        transform: position.transform,
                                    }}
                                >
                                    <div className="session-avatar-wrapper">
                                        <AvatarPreview avatarObject={avatarObject} />
                                    </div>
                                    <div className="Submitted-vote-card">{showEstimates ? (user.estimate || "?") : "?"}</div>
                                    <div className="Submitted-vote-card-text">{user.userName}</div>
                                </div>
                            );

                        })}
                    </div>
                </div>

                <div className="Voting-button-container">
                    {["1", "2", "3", "5", "8", "13", "?"].map((value) => (
                        <label key={value} className={`Voting-button ${selected === value ? "checked" : ""}`}>
                            {value}
                            <input
                                type="radio"
                                name="radio"
                                value={value}
                                checked={selected === value}
                                onChange={handleRadioChange}
                            />
                        </label>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SessionPage;
