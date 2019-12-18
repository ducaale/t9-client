import React from 'react'
import './App.css'

const Screen = ({ text, cursorPos }) => {
  return (
    <div className="Screen">
      <span className="Screen-text-container">{text}</span>
      <span className="Screen-cursor-container">
        {range(text.length + 1).map(i =>
          i === cursorPos ? (
            // TODO: make this breakable space when text[i] is.
            // to reproduce the bug type: 'ahmed is going to the staduim'
            // and move the cursor to pos 21
            <span key={i} className="Screen-cursor">|</span>
          ) : (
            <span key={i} className="Screen-hidden-char">{text[i]}</span>
          )
        )}
      </span>
    </div>
  )
}

export default Screen

const range = n => [...Array(n).keys()]