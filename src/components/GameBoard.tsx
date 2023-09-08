import React from 'react'

interface GameBoardProps {
    targetWord: string;
    guesses: string[];
}

const GameBoard: React.FC<GameBoardProps> = ({ targetWord, guesses}) => {
    const renderFeedback = () => {
        return (
            <div>
                {guesses.map((guess, index) => (
                <div key={index} className="guess-box">
                    {guess.split('').map((letter, letterIndex) => {
                        if (targetWord) {
                            const feedbackLetter = targetWord[letterIndex];
                            const isCorrectPosition = letter === feedbackLetter; 
                            const isCorrectLetter = targetWord.includes(letter);

                            let letterClass = 'letter-box';

                            if (isCorrectPosition) {
                                letterClass += '-green';
                            } else if (isCorrectLetter) {
                                letterClass += '-orange';
                            }

                            return (
                                <span key={letterIndex} className={letterClass}>
                                    {letter.toUpperCase()}
                                </span>
                            );
                        }
                    })}
                </div>
                ))}
            </div>
        );
    };


    
    return (
        <div className ="container mt-4">
            <div className="row mt-3">
                <div className="col">
                    {renderFeedback()}
                </div>
            </div>
        </div>
    )
};



export default GameBoard;