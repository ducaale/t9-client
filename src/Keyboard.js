import React from 'react'
import './App.css'

const Keyboard = ({ onBackspace, onInput, onCycle }) => {
  return (
    <div className="Keyboard">
      <span></span>
      <span></span>
      <button onClick={onBackspace}>⌫</button>
      <button disabled>1</button>
      <button onClick={() => onInput('2')}>2 abc</button>
      <button onClick={() => onInput('3')}>3 def</button>
      <button onClick={() => onInput('4')}>4 ghi</button>
      <button onClick={() => onInput('5')}>5 jkl</button>
      <button onClick={() => onInput('6')}>6 mno</button>
      <button onClick={() => onInput('7')}>7 pqrs</button>
      <button onClick={() => onInput('8')}>8 tuv</button>
      <button onClick={() => onInput('9')}>9 wxyz</button>
      <button onClick={() => onCycle()}>*</button>
      <button onClick={() => onInput(' ')}>0 ⌴</button>
      <button disabled>#</button>
    </div>
  )
}

export default Keyboard