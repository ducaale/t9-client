import React, { useState, useEffect, useRef } from 'react';
import Keyboard from './Keyboard'
import Screen from './Screen'
import { getPrediction } from './t9Service'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [text, setText] = useState('')
  const [lastPredictions, setLastPredictions] = useState([])
  const predictionIndex = useRef(0)

  useEffect(() => {
    const words = input.split(' ')
    const lastWord = words[words.length-1]
    getPrediction(lastWord)
      .then(predictions => {
        setLastPredictions(predictions)
      })
  }, [input])

  useEffect(() => {
    predictionIndex.current = 0
    setText(prev => {
      const words = prev.split(' ')
      words[words.length-1] = lastPredictions[0]
      return words.join('')
    })
  }, [lastPredictions])

  const handleInput = char => {
    setInput(prev => prev + char)
  }
  const handleBackSpace = () => {
    setInput(prev => prev.slice(0,-1))
  }
  const handleCycle = () => {
    if (!lastPredictions.length) { return }
    setText(prev => {
      const words = prev.split(' ')
      predictionIndex.current += 1
      words[words.length-1] = lastPredictions[predictionIndex.current]
      return words.join('')
    })
  }

  return (
    <div className="Body">
      <Screen text={text} />
      <Keyboard
        onInput={handleInput}
        onCycle={handleCycle}
        onBackspace={handleBackSpace}
      />
    </div>
  );
}

export default App;
