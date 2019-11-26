import { useState, useReducer, useEffect } from 'react';
import { getPrediction } from './t9Service'

const initialState = { input: [''], output: [''] }
const IOReducer = (state, action) => {
  const {input, output } = state
  switch(action.type) {
    case 'add_char':
      if (action.char === ' ') {
        return {
          ...state,
          input: [...input, ''],
          output: [...output, '']
        }
      }

      return {
        ...state,
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
          input: [...input.slice(0, -1)],
          output: [...output.slice(0, -1)]
        }
      }

      return {
        ...state,
        input: [...input.slice(0, -1), input[input.length-1].slice(0, -1)],
        output: [...output.slice(0, -1), output[output.length-1].slice(0, -1)]
      }
    
    case 'update_last_output':
      if (!input[input.length-1].length) {
        console.log('should not update an empty word')
        return state
      }

      return {
        ...state,
        output: [...output.slice(0, -1), action.updatedWord]
      }
    default:
      throw Error(`unknown action type ${action.type}`)
  }
}

const useT9 = () => {
  const [{ input, output }, dispatch] = useReducer(IOReducer, initialState)
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
    addChar: char => dispatch({ type: 'add_char', char }),
    deleteChar: () => dispatch({ type: 'delete_char' }),
    cyclePrediction: () =>
      setPredictionIndex(prev => (prev + 1) % predictions.length)
  }
}

export default useT9