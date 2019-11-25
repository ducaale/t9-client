
export const getPrediction = input => (
  fetch(`http://localhost:3001?input=${input}`)
    .then(res => {
      if (res.status !== 200) {
        console.log(`there was an http error, status code: ${res.status}`)
      }
      return res.json()
    })
    .catch(() => console.log('server side error has occured'))
)
