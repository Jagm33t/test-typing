import React from 'react';

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
      <h2>Results</h2>
      <p>Time Elapsed: {timeElapsed} seconds</p>
      <p>Characters Typed: {charactersTyped}</p>
      <p>Words Per Minute (WPM): {wpm}</p>
    </div>
  );
}

export default Result;
