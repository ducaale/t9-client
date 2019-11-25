import React, { useState } from 'react';
import Keyboard from './Keyboard'
import Screen from './Screen'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const handleInput = (char) => {
    setInput(prev => prev + char)
  }
  const handleBackSpace = () => {
    setInput(prev => prev.slice(0,-1))
  }
  const handleCycle = () => {}

  return (
    <div className="Body">
      <Screen text={input} />
      <Keyboard
        onInput={handleInput}
        onCycle={handleCycle}
        onBackspace={handleBackSpace}
      />
    </div>
  );
}

export default App;
