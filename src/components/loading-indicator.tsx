import React, { FC, useEffect, useState } from 'react';
import { setInterval } from 'timers';

export const LoadingIndicator: FC = () => {
    const messages = [
        'Racking Weights',
        'Waiting for Equipment Hogger',
        'Cleaning Down Equipment',
        'Stretching',
    ]

    const [message, setMessage] = useState(messages[Math.floor(Math.random()*messages.length)])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(messages[Math.floor(Math.random() * messages.length)])
        }, 3000)

        return () => {
            clearInterval(intervalId)
        };
    }, [setMessage, messages]);

    return (
        <div className="loading-message-container container">
            <progress className="progress is-medium is-dark" max="100"/>
            <div className="loading-message">
                {message}...
            </div>
        </div>
    )
}
