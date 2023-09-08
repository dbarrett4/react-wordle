import React, { useState } from 'react';

interface WordInputProps {
    onGuess: (guess: string) => void;
}

const WordInput: React.FC<WordInputProps> = ({ onGuess }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (inputValue.length != 5) {
            alert('Word must be 5 characters')
            return;
        }
        
        // If input is valid, call onGuess function with guess
        if (inputValue.trim() !== '') {
            onGuess(inputValue.toLowerCase());
            setInputValue('');
        }
    };

    return (
        <div className="container mt-4">
            <div className='row'>
                <div className='col'>
                    <form onSubmit={handleFormSubmit}>
                        <div className='form-group'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter your guess...'
                                value={inputValue}
                                onChange={handleInputChange}
                                />
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            Guess
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WordInput