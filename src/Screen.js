import React from 'react'
import './App.css'

const Screen = ({ text, cursorPos }) => {
  return (
    <div className="Screen">
      <span className="Screen-text">{text}</span>
      <span className="Screen-cursor">{'\u00A0'.repeat(cursorPos)}|</span>
    </div>
  )
}

export default Screen