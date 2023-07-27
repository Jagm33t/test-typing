import React from 'react';
import './Results.scss';

interface ResultProps {
  timeElapsed: number;
  charactersTyped: number;
}

function Result({ timeElapsed, charactersTyped }: ResultProps) {
  
  const calculateWPM = () => {
    // Calculate the time taken in minutes
    const timeInMinutes = timeElapsed / 60;

    // Calculate WPM based on characters typed instead of words
    const wpm = Math.round((charactersTyped / 5) / timeInMinutes); // Assuming an average word length of 5 characters
    return wpm;
    
  };

  

  const wpm = calculateWPM();
  
  return (
    <div className='result-container'>
      <h2 className='result-container__header'>Results</h2>
      <p className='result-para' >Time Elapsed: {timeElapsed} seconds</p>
      <p className='result-para'>Characters Typed: {charactersTyped}</p>
      <p className='result-para'>Words Per Minute (WPM): {wpm}</p>
    </div>
  );
}

export default Result;
