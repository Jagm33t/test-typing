import React, { useState, useEffect } from 'react';
import './Typing.scss';
import paragraphs from '../Paragraph/Paragraph';
import Result from '../Results/Results';



function Typing() {

  const [selectedLevel, setSelectedLevel] = useState('easy');
  const [selectedParagraph, setSelectedParagraph] = useState<any>('');
  const [showResult, setShowResult] = useState(false);
  

  useEffect(() => {
    selectIndex();
 
  }, [selectedLevel]);


  const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(event.target.value);
    
  };
  const selectIndex = () => {

    const levelParagraphs = paragraphs[selectedLevel];
    const randomIndex = Math.floor(Math.random() * levelParagraphs.length);
    
    setSelectedParagraph(levelParagraphs[randomIndex].content);
   
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
      console.log("Time's up!");
      setShowResult(true);
      setTimerStarted(false);
      
     
    }
  }, [timeLeft]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the timer is still running
    if (timeLeft > 0) {
      // Timer will start as soon as a letter is typed in the input field
      setTimerStarted(true);
  
      const key = event.key;
  
      // Check if the key pressed matches the current character in the paragraph
      if (key === selectedParagraph[currentIndex]) {
        setInputValue((prevInput) => prevInput + key);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }
  };
  

      const charactersTyped = inputValue.length;

  return (
    <div className='main-container'>
    <div className='main-header'>
  <h1 className='fancy-heading'>Test Your Typing Skills</h1>
</div>

      <div className='main-elements'>
    <h2 className='header-two'>TYPING SPEED TEST</h2>
      {showResult ? (
      <Result
        timeElapsed={60 - timeLeft}
        charactersTyped={charactersTyped}
      />
        ) : (
          <div className='main-clock'>
           <div className='main-timer'>{timeLeft} </div> 
            
          </div>
        )}
      <div className='select-levels'>
        <h3>Select level here:</h3>
      <select className='select-option' value={selectedLevel} onChange={handleLevelChange}>
           <option>Select</option>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='expert'>Expert</option>
        </select>
      </div>
     
     

      </div>
      <div className='last-section'>
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
        type="text"
        placeholder="Type here..." 
        name='input'
          value={inputValue}
          onKeyDown={handleKeyDown}

        />
      </div>
      </div>
      
    </div>
  );
}

export default Typing;
