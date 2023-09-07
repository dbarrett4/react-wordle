import React from 'react'

interface GameBoardProps {
    targetWord: string;
    guesses: string[];
}

const GameBoard: React.FC<GameBoardProps> = ({ targetWord, guesses}) => {
    const renderFeedback = () => {

    };

    return (
        <div className ="contaner mt-4">
            <div className ="row">
                <div className ="col">
                    <h2>Wordle</h2>
                </div>
            </div>

            <div className ="row">
                <div className ="col">
                    {/* Target word*/}
                    {targetWord}
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    {/* Feedback*/}
                </div>
            </div>
        </div>
    )
};



export default GameBoard;