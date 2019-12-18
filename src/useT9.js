import { useState, useReducer, useEffect } from 'react';
import { getPrediction } from './t9Service'

const ioInitialState = { input: [''], output: [''], cursorPos: 0 }
const ioReducer = (state, action) => {
  const {input, output, cursorPos } = state
  switch(action.type) {
    case 'add_char':
      if (action.char === ' ') {
        return {
          ...state,
          cursorPos: cursorPos + 1,
          input: [...input, ''],
          output: [...output, '']
        }
      }

      return {
        ...state,
        cursorPos: cursorPos + 1,
        input: [...input.slice(0, -1), input[input.length-1] + action.char],
        output: [...output.slice(0, -1), output[output.length-1] + '_']
      }
    
    case 'delete_char':
      if (input.length === 1 && input[0] === '') {
        return state
      }

      if (!input[input.length-1].length) {
        return {
          ...state,
          cursorPos: cursorPos - 1,
          input: [...input.slice(0, -1)],
          output: [...output.slice(0, -1)]
        }
      }

      return {
        ...state,
        cursorPos: cursorPos - 1,
        input: [...input.slice(0, -1), input[input.length-1].slice(0, -1)],
        output: [...output.slice(0, -1), output[output.length-1].slice(0, -1)]
      }
    
    case 'increment_cursor_pos':
      const inputLength = input.join(' ').length
      return {
        ...state,
        cursorPos: Math.min(inputLength, cursorPos + 1)
      }

    case 'decrement_cursor_pos':
      return {
        ...state,
        cursorPos: Math.max(0, cursorPos - 1)
      }
    
    case 'update_last_output':
      const lastInput = input[input.length-1]
      const { updatedWord } = action

      if (!lastInput.length) {
        console.log('should not update an empty word')
        return state
      }
      if (lastInput.length !== updatedWord.length) {
        console.log('ignoring stale word')
        return state
      }

      return {
        ...state,
        output: [...output.slice(0, -1), updatedWord]
      }
    default:
      throw Error(`unknown action type ${action.type}`)
  }
}

const useT9 = () => {
  const [{ input, output, cursorPos }, dispatch] = useReducer(ioReducer, ioInitialState)
  const [predictions, setPredictions] = useState([])
  const [predictionIndex, setPredictionIndex] = useState(0)

  useEffect(() => {
    getPrediction(input[input.length-1]).then(prediction => {
      setPredictionIndex(0)
      setPredictions(prediction)
    })
  }, [input])

  useEffect(() => {
    if (predictions[predictionIndex]) {
      dispatch({
        type: 'update_last_output',
        updatedWord: predictions[predictionIndex]
      })
    }
  }, [predictions, predictionIndex])

  return {
    output: output.join(' '),
    cursorPos,
    addChar: char => dispatch({ type: 'add_char', char }),
    deleteChar: () => dispatch({ type: 'delete_char' }),
    incrementCursorPos: () => dispatch({ type: 'increment_cursor_pos' }),
    decrementCursorPos: () => dispatch({ type: 'decrement_cursor_pos' }),
    cyclePrediction: () =>
      setPredictionIndex(prev => (prev + 1) % predictions.length)
  }
}

export default useT9