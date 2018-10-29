import express from 'express'


const app = express()
const port = 8090



app.get('/', (req, res) => {
  res.send('Hello there')
})

app.listen(port, () => console.log(`listening on port ${port}`))
