import React from 'react';

interface FeedbackProps {
    feedback: string[];
}

const Feedback: React.FC<FeedbackProps> = ({ feedback }) => {

    return (
        <div className='container mt-4'>
            <div className='row'>
                {feedback.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
        </div>
    )
}

export default Feedback;