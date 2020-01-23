import { useState, useEffect } from 'react';

export const zip = (arr1, arr2) => {
  return arr1.map((e, i) => [e, arr2[i]])
}

export const partition = (string, at) => {
  if (at < 0 || at > string.length) {
    throw Error(`cannot partition ${string} at pos ${at}`)
  }
  return [string.slice(0, at), string.slice(at)]
}

export const insertAt = (string, index, char) => {
  const [part1, part2] = partition(string, index)
  return [part1, char, part2].join('')
}

export const deleteFrom = (string, index) => {
  const [part1, part2] = partition(string, index)
  return [part1.slice(0, -1), part2].join('')
}

export const merge = (string1, string2) => {
  return string1.concat(string2)
}

export const range = ({ start = 0, end }) => {
  return [...Array(end).keys()].slice(start)
}

export const updateElements = (arr, from, number, fn) => {
  const indexes = range({ start: from, end: from + number })
  const toBeUpdated = indexes.map(i => arr[i])
  return [
    ...arr.slice(0, from),
    ...fn(toBeUpdated),
    ...arr.slice(from + number)
  ]
}

export const updateElement = (arr, index, fn) => {
  const newFn = ([i]) => fn(i)
  return updateElements(arr, index, 1, newFn)
}

export const getCharPos = (words, cursorPos) => {
  let searchCursor = 0
  for (let i = 0; i < words.length; i++) {
    searchCursor += words[i].length + 1
    if (cursorPos < searchCursor) {
      return {
        wordIndex: i,
        offset: words[i].length - (searchCursor - cursorPos) + 1
      }
    }
  }
}

export const usePromise = fn => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  useEffect(() => {
    setLoading(true)
    fn().then(data => {
      setData(data)
      setLoading(false)
    })
  }, [fn])

  return [data, loading]
}
