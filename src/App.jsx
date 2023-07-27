import Timer from './components/Typing/Typing';
import './App.css';
import typing from './assets/images/typing.gif';

function App() {
  return (
    <div className="App">
    
   <Timer / >
   <img className='animation-typing' src={typing} alt="" />
    </div>
  );
}

export default App;
