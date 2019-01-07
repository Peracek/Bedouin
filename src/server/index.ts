import express, { ErrorRequestHandler } from 'express'
import expressWs from 'express-ws'

import config from '../../config.json'
import authMiddleware from './authMiddleware'
import { log } from 'common/logger'
import { APIError } from 'api/APIError'

let app = express()
expressWs(app)
// NOTE: this has to be after app's websocket initialization
import { templatesRouter, jobsRouter, allocationsRouter } from './api'

const port = 3001

// enable CORS
app.use(function(_, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
// enable client access location header
app.use((__dirname, res, next) => {
  res.header("Access-Control-Expose-Headers", "location")
  next()
})
app.use(express.json())

if(config.authentication && config.authentication.enable) {
  app.use(authMiddleware)
}

app.use('/api/templates', templatesRouter)
app.use('/api/jobs', jobsRouter)
app.use('/api/allocations', allocationsRouter)

app.get('/api/', (_, res) => res.send('I\'m alive!'))

app.use(((err, req, res, next) => {
  if(err instanceof APIError) {
    res.status(err.status).json(err.body)
    return
  }
  res.sendStatus(500)
}) as ErrorRequestHandler)

app.listen(port, () => log('info', `Bedouin app listening on port ${port}!`))

