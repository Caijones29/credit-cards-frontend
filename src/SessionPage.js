import logo from './logo.png';
import './App.css';
import './LogoElements.css';
import './LandingPageElements.css';
import './SessionPageElements.css';
import './LandingPage.jsx';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function SessionPage() {
    const [selected, setSelected] = useState(null);
    const [revealVotes, setRevealVotes] = useState(false);
    const [username, setUsername] = useState('');
    const [showWelcome, setShowWelcome] = useState(true);
    const [modeValue, setModeValue] = useState('');
    const [showMode, setShowMode] = useState(false);
    const [meanValue, setMeanValue] = useState('');
    const [showMean, setShowMean] = useState(false);
    const [medianValue, setMedianValue] = useState('');
    const [showMedian, setShowMedian] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [votingEnabled, setVotingEnabled] = useState(true);
    const [estimate, setEstimate] = useState('');
    const [dataList, setDataList] = useState([]);
    const [privateSession, setPrivateSession] = useState(true);
    const stompClientRef = useRef(null);
    const { sessionCode } = useParams();

    sessionStorage.setItem('sessionCode',sessionCode );
    // TODO Check whether username and userID are stored in session
    const handleRadioChange = (event) => {
        console.log("Radio button ", event.target.value, "  clicked!");
        setSelected(event.target.value);
        setRevealVotes(false);
        setShowMode(false);
        setShowMean(false);
        setShowMedian(false);
        setModeValue(event.target.value);
        setMeanValue(event.target.value);
        setMedianValue(event.target.value);
        setEstimate(event.target.value);
    };

    const handleResetVoting = () => {
        setSelected(null);
        setRevealVotes(false);
        setShowMode(false);
        setShowMean(false);
        setShowMedian(false);
        setModeValue('');
        setMeanValue('');
        setMedianValue('');
        setVotingEnabled(true);
        setFadeIn(false);
    };

    const handleRevealVotes = () => {
        setRevealVotes(true);
        setShowMode(true);
        setShowMean(true);
        setShowMedian(true);
        setFadeIn(true);
        setVotingEnabled(false);
    };

    console.log("Selected value:", selected);

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
        if (estimate) {
            sendMessage();
        }
    }, [estimate]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
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
                        setDataList(prevDataList => [...prevDataList, receivedData]);
                    } catch (error) {
                        console.error('Error parsing message body as JSON:', error);
                    }
                });
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

    const sendMessage = () => {
        const sessionRequest = {
            revealVotes: revealVotes,
            sessionCode: sessionCode,
            privateSession: privateSession,
            participant: {
                userName: sessionStorage.getItem('username'),
                userID: sessionStorage.getItem('userID'),
                estimate: estimate
            }
        };

        if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.publish({
                destination: '/app/session/info/pQvxO',
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
                </div>
            </header>

            {showWelcome && (
                <div className="Welcome-popup">
                    Welcome, {username}!
                </div>
            )}

            <div className="App-body">
                <div className="Poker-table-container">
                    {selected && (
                        <button className="Reset-voting-button" onClick={handleResetVoting}>
                            Reset Voting
                        </button>
                    )}
                    <div className="Poker-table">
                        {!showMode && selected && !revealVotes && (
                            <button className="Reveal-submitted-votes-button" onClick={handleRevealVotes}>Reveal Submitted Votes</button>
                        )}

                        <div className={`Vote-average-container ${fadeIn ? 'fade-in' : ''}`}>
                            <div className="Mean-vote-average-container" style={{ display: showMean ? 'flex' : 'none' }}>
                                <div className="Mean-vote-average">
                                    {meanValue}
                                </div>

                                <div className="Mean-vote-average-text">
                                    Vote Average
                                </div>
                            </div>

                            <div className="Mode-vote-average-container" style={{ display: showMode ? 'flex' : 'none' }}>
                                <div className="Mode-vote-average">
                                    {modeValue}
                                </div>

                                <div className="Mode-vote-average-text">
                                    Most Common Vote
                                </div>
                            </div>

                            <div className="Median-vote-average-container" style={{ display: showMedian ? 'flex' : 'none' }}>
                                <div className="Median-vote-average">
                                    {medianValue}
                                </div>

                                <div className="Median-vote-average-text">
                                    Meet in the Middle?
                                </div>
                            </div>
                        </div>

                        {selected && (
                            <div className="Submitted-vote-card-container">
                                <div className="Submitted-vote-card">
                                    {selected}
                                </div>
                                <div className="Submitted-vote-card-text">
                                    {username}'s Vote
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                    <div className="Voting-button-container">
                        {["1", "2", "3", "5", "8", "13", "?"].map((value) => (
                            <label key={value} className={`Voting-button ${selected === value ? "checked" : ""}`} style={{ pointerEvents: votingEnabled ? 'auto' : 'none', opacity: votingEnabled ? 1 : 0.6 }} >
                                {value}
                                    <input type="radio" name="radio" value={value} checked={selected === value} onChange={handleRadioChange} disabled={!votingEnabled}/>
                            </label>
                        ))}
                    </div>
                </div>
        </>
    );
}

export default SessionPage;