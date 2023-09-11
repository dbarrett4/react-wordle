import React from 'react';

interface StreaksProps {
    currentStreak: number;
    highestStreak: number;
}

const Streaks: React.FC<StreaksProps> = ({currentStreak, highestStreak}) => {

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col'>
                    <p>Current streak: {currentStreak}</p>
                </div>
                <div className='col'>
                    <p>Highest streak: {highestStreak}</p>
                </div>
            </div>
        </div>
    );
}

export default Streaks;