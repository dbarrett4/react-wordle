import React, { useState } from 'react';

interface WordInputProps {
    onGuess: (guess: string) => void;
    disabled: boolean
}

const WordInput: React.FC<WordInputProps> = ({ onGuess, disabled }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        
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
                                id='guess-box'
                                type='text'
                                className='form-control'
                                placeholder='Enter your guess...'
                                value={inputValue}
                                onChange={handleInputChange}
                                disabled={disabled}
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