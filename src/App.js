import React from 'react';
import Keyboard from './Keyboard'
import Screen from './Screen'
import useT9 from './useT9'
import './App.css'

function App() {
  const {
    loading,
    output,
    cursorPos,
    addChar,
    deleteChar,
    incrementCursorPos,
    decrementCursorPos,
    cyclePrediction
  } = useT9()

  return (
    <div className="Body">
      <Screen loading={loading} text={output} cursorPos={cursorPos} />
      <Keyboard
        onInput={addChar}
        onCycle={cyclePrediction}
        onBackspace={deleteChar}
        onIncrementCursorPos={incrementCursorPos}
        onDecrementCursorPos={decrementCursorPos}
      />
    </div>
  );
}

export default App;
