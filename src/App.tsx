import React, { useState, useEffect} from 'react';
import GameBoard from './components/GameBoard';
import WordInput from './components/WordInput';
import Feedback from './components/Feedback';

const App: React.FC = () => {
  const[words, setWords] = useState<string[]>([]);
  
  const[targetWord, setTargetWord] = useState('');
  const[guesses, setGuesses] = useState([]);
  const[feedback, setFeedback] = useState([]);
  
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
  }
  
  return <div>{generateRandomWord()}</div>
}

export default App;