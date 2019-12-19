import React from 'react'
import './App.css'

const Screen = ({ text, cursorPos }) => {
  return (
    <div className="Screen">
      <span className="Screen-text-container">
        {range(text.length + 1).map(i =>
          <span key={i} className={i === cursorPos ? "Screen-cursor" : ""}>
            {i < text.length ? text[i] : '\u00A0' }
          </span>
        )}
      </span>
    </div>
  )
}

export default Screen

const range = n => [...Array(n).keys()]