import React, { useState, useEffect } from 'react';
import './Timer.scss';

function Timer() {
  const paragraphText = `"The quick brown fox jumps over the lazy dog. It was a beautiful summer day, and the sun shone brightly in the clear blue sky. The gentle breeze rustled through the leaves of the tall trees, creating a soothing melody. Children played in the nearby park, their laughter filling the air with joy. As the day went on, friends gathered for a picnic, bringing delicious food and refreshing drinks. Everyone enjoyed the day's activities, cherishing the simple moments of happiness and togetherness. Time seemed to slow down, allowing them to savor each precious second of this perfect summer day."`;

  const [timeLeft, setTimeLeft] = useState(60);
  const [inputValue, setInputValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (timerStarted && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    // Clean up the interval when the component unmounts or the timer reaches 0
    return () => clearInterval(timerInterval);
  }, [timerStarted, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      // Perform any actions you want when the timer ends (e.g., submit the test, show results)
      console.log("Time's up!");
    }
  }, [timeLeft]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

    // Check if the key pressed matches the current character in the paragraph
    if (key === paragraphText[currentIndex]) {
      setInputValue((prevInput) => prevInput + key);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleStartTimer = () => {
    setTimerStarted(true);
  };

  return (
    <div className='main-container'>
      <div className='main-header'>
        <h1>Test Your Typing Skills</h1>
      </div>
      <div className='main-elements'>
        <div className='main-timer'>{timeLeft} seconds</div>
        <div className='main-wpm'></div>
        <div className='accuracy'></div>
      </div>
      <div className='main-para'>
        {paragraphText.split('').map((char, index) => {
          let charClass = '';
          if (index < currentIndex) {
            charClass = inputValue[index] === char ? 'correct' : 'incorrect';
          } else if (index === currentIndex) {
            charClass = 'current-char';
          }
          return (
            <span key={index} className={charClass}>
              {char}
            </span>
          );
        })}
      </div>
      <div className='main-inputarea'>
        <input
          value={inputValue}
          onKeyDown={handleKeyDown}
          readOnly // To prevent direct input to the input field
        />
      </div>
      <button onClick={handleStartTimer}>Start Timer</button>
    </div>
  );
}

export default Timer;
