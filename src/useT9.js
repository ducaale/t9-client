import { useReducer, useMemo } from 'react';
import { getCachedPrediction } from './t9Service'
import {
  zip,
  partition,
  insertAt,
  deleteFrom,
  merge,
  getCharPos,
  updateElement,
  updateElements,
  wrapPromise
} from './utils'

const ioInitialState = {
  input: [''],
  output: [''],
  selectedPredictions: [0],
  cursorPos: 0
}
const ioReducer = (state, action) => {
  const { input, selectedPredictions, cursorPos } = state
  const { wordIndex, offset } = getCharPos(input, cursorPos)

  switch(action.type) {
    case 'add_char':
      if (action.char === ' ') {
        return {
          ...state,
          cursorPos: cursorPos + 1,
          input: updateElement(input, wordIndex, word => partition(word, offset)),
          selectedPredictions: updateElement(selectedPredictions, wordIndex, predictionIndex =>
            [predictionIndex, 0]
          )
        }
      }

      return {
        ...state,
        cursorPos: cursorPos + 1,
        input: updateElement(input, wordIndex, word => [insertAt(word, offset, action.char)]),
        selectedPredictions: updateElement(selectedPredictions, wordIndex, () => [0])
      }
    
    case 'delete_char':
      if (wordIndex === 0 && offset === 0) {
        return state
      }

      if (offset === 0) {
        return {
          ...state,
          cursorPos: cursorPos - 1,
          input: updateElements(input, wordIndex-1, 2, words => [merge(...words)]),
          selectedPredictions: updateElements(selectedPredictions, wordIndex-1, 2, () => [0])
        }
      }

      return {
        ...state,
        cursorPos: cursorPos - 1,
        input: updateElement(input, wordIndex, word => [deleteFrom(word, offset)]),
        selectedPredictions: updateElement(selectedPredictions, wordIndex, () => [0])
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
    
    case 'increment_prediction_index':
      return {
        ...state,
        selectedPredictions: updateElement(selectedPredictions, wordIndex, predictionIndex =>
          [predictionIndex + 1]
        )
      }

    default:
      throw Error(`unknown action type ${action.type}`)
  }
}

const useT9 = () => {
  const [{ input, selectedPredictions, cursorPos }, dispatch] = useReducer(
    ioReducer,
    ioInitialState
  )

  const outputResource =
    useMemo(
      () => wrapPromise(
        Promise.all(
          zip(input, selectedPredictions)
            .map(args => getCachedPrediction(...args))
        )
        .then(words => words.join(' '))
      ),
      [input, selectedPredictions]
    )

  return {
    outputResource,
    cursorPos,
    addChar: char => dispatch({ type: 'add_char', char }),
    deleteChar: () => dispatch({ type: 'delete_char' }),
    incrementCursorPos: () => dispatch({ type: 'increment_cursor_pos' }),
    decrementCursorPos: () => dispatch({ type: 'decrement_cursor_pos' }),
    cyclePrediction: () => dispatch({ type: 'increment_prediction_index' })
  }
}

export default useT9