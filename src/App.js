import React from 'react';
import Keyboard from './Keyboard'
import Screen from './Screen'
import useT9 from './useT9'
import './App.css'

function App() {
  const { output, addChar, deleteChar, cyclePrediction } = useT9()

  return (
    <div className="Body">
      <Screen text={output} cursorPos={30} />
      <Keyboard
        onInput={addChar}
        onCycle={cyclePrediction}
        onBackspace={deleteChar}
      />
    </div>
  );
}

export default App;
