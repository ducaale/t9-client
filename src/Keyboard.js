import React, { useTransition } from 'react'
import './App.css'

const Keyboard = ({
  onBackspace,
  onInput,
  onCycle,
  onIncrementCursorPos,
  onDecrementCursorPos
}) => {
  return (
    <div className="Keyboard">
      <Button onClick={onDecrementCursorPos}>⯇</Button>
      <Button onClick={onIncrementCursorPos}>⯈</Button>
      <Button onClick={onBackspace}>⌫</Button>
      <Button disabled>1</Button>
      <Button onClick={() => onInput('2')}>2 abc</Button>
      <Button onClick={() => onInput('3')}>3 def</Button>
      <Button onClick={() => onInput('4')}>4 ghi</Button>
      <Button onClick={() => onInput('5')}>5 jkl</Button>
      <Button onClick={() => onInput('6')}>6 mno</Button>
      <Button onClick={() => onInput('7')}>7 pqrs</Button>
      <Button onClick={() => onInput('8')}>8 tuv</Button>
      <Button onClick={() => onInput('9')}>9 wxyz</Button>
      <Button onClick={() => onCycle()}>*</Button>
      <Button onClick={() => onInput(' ')}>0 ⌴</Button>
      <Button disabled>#</Button>
    </div>
  )
}

export default Keyboard

const Button = ({ onClick, children }) => {
  const [startTransition] = useTransition({ timeoutMs: 100 })
  const handleClick = () => {
    startTransition(() => {
      onClick()
    })
  }

  return <button onClick={handleClick}>{children}</button>
}