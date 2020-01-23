import React from 'react'
import { range } from './utils'
import './App.css'

const Screen = ({ loading, text, cursorPos }) => {
  if (loading) return <div className="Screen">Loading...</div>
 
  return (
    <div className="Screen">
      <span className="Screen-text-container">
        {range({ end: text.length + 1 }).map(i =>
          <span key={i} className={i === cursorPos ? "Screen-cursor" : ""}>
            {i < text.length ? text[i] : '\u00A0' }
          </span>
        )}
      </span>
    </div>
  )
}

export default Screen
