import React, { useState, useEffect } from 'react';
import './Timer.scss';
import paragraphs from '../Paragraph/Paragraph';
import Result from '../Results/Results';

function Timer() {

  const [selectedLevel, setSelectedLevel] = useState('easy');
  const [selectedParagraph, setSelectedParagraph] = useState<any>('');
  const [showResult, setShowResult] = useState(false);

console.log("selectedParagraph", selectedParagraph);

  const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(event.target.value);
    selectIndex();
 
  };

  const selectIndex = () => {
    // Generate a random number between 1 and 10
    const randomIndex = Math.floor(Math.random() * 10) + 1;
    setSelectedParagraph(paragraphs[selectedLevel][randomIndex].content);
    
   
  };


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
      setShowResult(true);

      setTimerStarted(false);
     
    }
  }, [timeLeft, inputValue]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //Timer will start ass soon as letter is typed in input field
     setTimerStarted(true);
    
    const key = event.key;

    // Check if the key pressed matches the current character in the paragraph
    if (key === selectedParagraph[currentIndex]) {
      setInputValue((prevInput) => prevInput + key);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const charactersTyped = inputValue.length;

  return (
    <div className='main-container'>
      <div className='main-header'>
        <h1>Test Your Typing Skills</h1>
      </div>
      <div className='main-elements'>

      <select value={selectedLevel} onChange={handleLevelChange}>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='expert'>Expert</option>
        </select>

        {showResult ? (
      <Result
        timeElapsed={60 - timeLeft}
        charactersTyped={charactersTyped}
      />
        ) : (
          <div>
            <div className='main-timer'>{timeLeft} seconds</div>
            <div className='accuracy'></div>
          </div>
        )}
      </div>
      <div className='main-para'>
        {selectedParagraph.split('').map((char: string, index: number) => {
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
    </div>
  );
}

export default Timer;
