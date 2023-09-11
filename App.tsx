import React, { useState, useEffect} from 'react';
import GameBoard from './components/GameBoard';
import WordInput from './components/WordInput';
import Feedback from './components/Feedback';
import Streaks from './components/Streaks';
import './App.css'

const App: React.FC = () => {
  const[words, setWords] = useState<string[]>([]);
  const[targetWord, setTargetWord] = useState<string>('');
  const[guesses, setGuesses] = useState<string[]>([]);
  const[feedback, setFeedback] = useState<string[]>(["Guess the 5 letter word"]);
  const[streak, setStreak] = useState<number>(0);
  const[highestStreak, setHighestStreak] = useState<number>(0);
  const[inputIsDisabled, setInputIsDisabled] = useState<boolean>(false);

  const maxAttempts = 6;
  const defaultWordList = ['apple', 'cherry', 'plane', 'alien', 'child', 'radio', 'elite', 'adult', 'smoke', 'wheat', 'salad', 'basic']
  
  // Get the list of words from the words.txt file
  const fetchWords = async() => {
    try {
      // Open words.txt file
      const response = await fetch('/src/words.txt')
      const words = await response.text();

      // Parse
      const wordList = await words.toLowerCase().split('\n').filter(word => word.trim() !== '');
      setWords(wordList);
    } catch(error) {
      console.error('Error fetching word list: ', error);
    }
  };
  
  useEffect(() => {
    fetchWords();

    // Set initial target word
    setTargetWord(generateRandomWord());
    // Temporary fix for a bug where the word list won't initialise on startup. (Word list is loaded properly after first game/reset)
    if (!targetWord) {
      const index = Math.floor(Math.random() * defaultWordList.length);
      setTargetWord(defaultWordList[index]);
    } 
  }, []);

  // Returns a random value (word) from the words.txt file
  const generateRandomWord = () => {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  };

  // Passed into the WordInput component. Verifys guesses and determines wins/losses
  const handleGuess = async (guess: string) => {
    if (guesses.length >= maxAttempts) {
      // Max attempts reached. Do nothing.
      return;
    }
    
    // Validity checking
    if (guess.length != 5) {
      generateFeedback(["Your guess must contain 5 letters"]);
      return;
    } else {
      generateFeedback([""]);
    }
    
    // Check that the word is English against the Merriam-Webster API
    const apiKey='f030c8b3-7e47-4832-b41f-3aa8a2496776';
    const apiUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${guess}?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (Array.isArray(data)) {
        // Check each entry in response
        const isValidWord = data.some((entry) => {
          if (entry.hasOwnProperty("meta")) { // Then its a valid word in the dictionary
            return true;
          }
          return false;
        });

        if (!isValidWord) {
          generateFeedback(["Your guess must be a valid English word"]);
          return;
        }
        else {
          generateFeedback([""]);
        }
      }
    } catch(error) {
      console.error('Error validating word: ', error);
    }
    
    // Update guesses array with current guess
    setGuesses([...guesses, guess]);

    // Check if guess is correct
    const isCorrect = (guess.trim().toLowerCase() === targetWord.trim().toLowerCase());
    
    // Check for win or loss
    if (isCorrect) {
      setInputIsDisabled(true);
      generateFeedback(["You've won! The word was: " + targetWord, "Click 'Reset Game' to play again"]);

      // Set streaks
      if ((streak + 1) > highestStreak) {
        setHighestStreak(streak + 1);
      }
      setStreak(streak + 1);
      
    }
    else if (guesses.length >= maxAttempts - 1) {
      setInputIsDisabled(true);
      generateFeedback(["You've lost. The word was: " + targetWord, "Click 'Reset Game' to play again"]);
      setStreak(0);
    }
  };

  // Resets game board to initial state and selects a new word
  const resetGame = () => {
    if (!inputIsDisabled) {
      setStreak(0);
    }
    setInputIsDisabled(false);
    setGuesses([]);
    setFeedback(["Guess the 5 letter word"]);
    setTargetWord(generateRandomWord());
  };

  const generateFeedback = (messages: string[]) => {
    setFeedback(messages)
  }

  return (
    <div className='App'>
      <h1>React Wordle</h1>
      <Streaks currentStreak={streak} highestStreak={highestStreak}></Streaks>
      <Feedback feedback={feedback}></Feedback>
      <GameBoard targetWord={targetWord} guesses={guesses} />
      <WordInput onGuess={handleGuess} disabled={inputIsDisabled}/> 
      <br></br>
      <button onClick={resetGame} className='btn btn-primary'>Reset Game</button>
    </div>
  );
}

export default App;