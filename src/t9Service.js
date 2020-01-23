
const getPrediction = input => (
  fetch(`http://localhost:3001?input=${input}`)
    .then(res => {
      if (res.status !== 200) {
        console.log(`there was an http error, status code: ${res.status}`)
        return []
      }
      return res.json()
    })
    .catch(() => {
      console.log('server side error has occured')
      return []
    })
)

const cache = {}
export const getCachedPrediction = async (input, index) => {
  if (!cache[input]) {
    cache[input] = await getPrediction(input)
  }

  const predictions = cache[input]
  return predictions[index % predictions.length] || input
}
