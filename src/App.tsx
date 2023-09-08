import React, { useState, useEffect} from 'react';
import GameBoard from './components/GameBoard';
import WordInput from './components/WordInput';
import './App.css'

const App: React.FC = () => {
  const[words, setWords] = useState<string[]>([]);
  
  const[targetWord, setTargetWord] = useState('');
  const[guesses, setGuesses] = useState<string[]>([]);


  const maxAttempts = 6;
  
  // Get the list of words from the words.txt file
  const fetchWords = async() => {
    try {
      // Open words.txt file
      const response = await fetch('/src/words.txt')
      const words = await response.text();

      // Parse
      const wordList = words.split('\n').filter(word => word.trim() !== '');
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

  const handleGuess = (guess: string) => {
    // Check if guess is correct
    const isCorrect = (guess.trim().toLowerCase() === targetWord.trim().toLowerCase());

    // Update guesses array with current guess
    setGuesses([...guesses, guess]);
    
    // Check for win or loss
    if (isCorrect) {
      alert('Win');
      resetGame();
    }
    else if (guesses.length >= maxAttempts - 1) {
      alert('Loss');
      resetGame();
    }
    
  };

  const resetGame = () => {
    setGuesses([]);
    setTargetWord(generateRandomWord());
  };


  // Generate random word when component mounts
  useEffect(() => {
    setTargetWord(generateRandomWord());
  }, []);
  
  return (
    <div className='App'>
      <h1>React Wordle</h1>
      <GameBoard targetWord={targetWord} guesses={guesses} />
      <WordInput onGuess={handleGuess}/>
      <br></br>
      <button onClick={resetGame} className='btn btn-primary'>Reset Game</button>
    </div>
  );
}

export default App;