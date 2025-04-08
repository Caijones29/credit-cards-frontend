import React, { useEffect, useState } from 'react';
import '../css/Toast.css';

const Toast = ({ message, duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => {
                if (onClose) {
                    onClose();
                }
            }, 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`toast-container ${visible ? 'visible' : ''}`}>
            <div className="toast-message">
                {message}
            </div>
        </div>
    );
};

export default Toast;
