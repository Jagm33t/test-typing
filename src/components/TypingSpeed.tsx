import React, { useState, useEffect, useRef } from 'react';

const TypingSpeedTest: React.FC = () => {
  const [displayedNumber, setDisplayedNumber] = useState<number>(generateRandomNumber());
  const [userInput, setUserInput] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(0);
  const [typingSpeed, setTypingSpeed] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus on the input field when the component mounts or the displayed number changes.
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [displayedNumber]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserInput(value);

    // Calculate typing speed and accuracy
    if (value === displayedNumber.toString()) {
      const endTime = Date.now();
      const totalTimeInSeconds = (endTime - startTime) / 1000;
      const charactersTyped = value.length;
      const speed = charactersTyped / totalTimeInSeconds;
      setTypingSpeed(speed);
      const calculatedAccuracy = (value.length / displayedNumber.toString().length) * 100;
      setAccuracy(calculatedAccuracy);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  const handleRestart = () => {
    setUserInput('');
    setDisplayedNumber(generateRandomNumber());
    setStartTime(0);
    setTypingSpeed(0);
    setAccuracy(100);
  };

  return (
    <div>
      <h1>Type the number:</h1>
      <h2>{displayedNumber}</h2>
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type the number here"
      />
      {startTime > 0 && (
        <div>
          <p>Typing speed: {typingSpeed.toFixed(2)} characters per second</p>
          <p>Accuracy: {accuracy.toFixed(2)}%</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};


const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

export default TypingSpeedTest;
