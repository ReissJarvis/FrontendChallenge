import React, { FC, useEffect, useState } from 'react';

const messages = [
    'Racking Weights',
    'Waiting for Equipment Hogger',
    'Cleaning Down Equipment',
    'Stretching',
    'Trying to Reserve Equipment',
    'Asking How Many Reps They Have Left',
]

function getMessage() {
    return messages[Math.floor(Math.random() * messages.length)]
}

export const LoadingIndicator: FC = () => {
    const [message, setMessage] = useState(getMessage())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(getMessage())
        }, 3000)

        return () => {
            clearInterval(intervalId)
        };
    }, [setMessage]);

    return (
        <div className="loading-message-container container">
            <progress className="progress is-small is-dark" max="100"/>
            <div className="loading-message">
                {message}...
            </div>
        </div>
    )
}
