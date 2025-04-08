import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../css/landingPageUI/joinPage/SessionDetailsList.css';
import userImage from '../../../customImages/participantIcon/userIcon.png';
import {useNavigate} from "react-router-dom";
const SessionDetailsList = ({ onSelectSession }) => {
    const [sessionDetails, setSessionDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessionDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/session/getPublic`)
                setSessionDetails(response.data);
            } catch (error) {
                navigate("/error")
                console.error('Error fetching session details:', error);
            }
        };

        fetchSessionDetails();

        const interval = setInterval(fetchSessionDetails, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="session-container">
            <div className="session-button-list">
                {sessionDetails.map((session, index) => (
                    <button
                        key={index}
                        className="session-button"
                        onClick={() => onSelectSession(session.sessionCode)}
                    >
                        <h2>Session Code: {session.sessionCode}</h2>
                        <div className="participant-info">
                            <img src={userImage} alt="Participants" className="participant-image" />
                            <span id="participant-count">{session.participants.length}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SessionDetailsList;
