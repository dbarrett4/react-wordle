import React, { useState, useEffect} from 'react';
import GameBoard from './components/GameBoard';
import WordInput from './components/WordInput';
import Feedback from './components/Feedback';
import './App.css'

const App: React.FC = () => {
  const[words, setWords] = useState<string[]>([]);
  
  const[targetWord, setTargetWord] = useState('');
  const[guesses, setGuesses] = useState<string[]>([]);
  const[feedback, setFeedback] = useState<string[]>([]);


  const maxAttempts = 6;
  const streak = 0;
  const maxStreak = 0;
  
  // Get the list of words from the words.txt file
  const fetchWords = async() => {
    try {
      // Open words.txt file
      const response = await fetch('/src/words.txt')
      const words = await response.text();

      // Parse
      const wordList = words.toLowerCase().split('\n').filter(word => word.trim() !== '');
      setWords(wordList);
    } catch(error) {
      console.error('Error fetching word list: ', error);
    }
  };
  
  useEffect(() => {
    fetchWords();
  }, []);

  // Returns a random value (word) from the words.txt file
  const generateRandomWord = () => {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  };

  const handleGuess = async (guess: string) => {
    if (guesses.length >= maxAttempts) {
      // Max attempts reached. Do nothing.
      return;
    }
    
    // Check if guess is correct
    const isCorrect = (guess.trim().toLowerCase() === targetWord.trim().toLowerCase());

    // Update guesses array with current guess
    setGuesses([...guesses, guess]);
    
    // Check for win or loss
    if (isCorrect) {
      generateFeedback(["You've won! The word was: " + targetWord, "Click 'Reset Game' to play again"])
    }
    else if (guesses.length >= maxAttempts - 1) {
      generateFeedback(["You've lost. The word was: " + targetWord, "Click 'Reset Game' to play again"])
    }
    
  };

  
  // Resets game board to initial state and selects a new word
  const resetGame = () => {
    setGuesses([]);
    setFeedback(["Guess the 5 letter word"]);
    setTargetWord(generateRandomWord());
  };

  const generateFeedback = (messages: string[]) => {
    setFeedback(messages)
  }

  // Generate random word when component mounts
  useEffect(() => {
    setTargetWord(generateRandomWord());
  }, []);

  return (
    <div className='App'>
      <h1>React Wordle</h1>
      <Feedback feedback={feedback}></Feedback>
      <GameBoard targetWord={targetWord} guesses={guesses} />
      <WordInput onGuess={handleGuess}/>
      <br></br>
      <button onClick={resetGame} className='btn btn-primary'>Reset Game</button>
    </div>
  );
}

export default App;