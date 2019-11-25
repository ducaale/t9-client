import React from 'react'
import './App.css'

const Screen = ({ text }) => {
  return (
    <div className="Screen">
      <span>{text}</span>
      <span className="Screen-cursor">|</span>
    </div>
  )
}

export default Screen