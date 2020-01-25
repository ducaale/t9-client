import React, { Suspense } from 'react'
import { range } from './utils'
import './App.css'

const Screen = ({ textResource, cursorPos }) => {
  const text = textResource.read()
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

export default (props) => (
  <Suspense fallback={<div className="Screen">Loading...</div>}>
    <Screen {...props} />
  </Suspense>
)
