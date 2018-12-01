import express from 'express'

import { jobs } from '../../nomadClient'

const router = express.Router()

router.get('/', async (_, res) => {
  const data = await jobs.getAll()
  // poslat res.location() kde budou websocketi updates?
  res.json(data)
})

router.ws('/', async (ws) => {
  const subscription = jobs.getAllObservable.subscribe({
    next(jobs) {
      ws.send(JSON.stringify(jobs))
    },
    error() {
      ws.close(1011) // server error code
    },
    complete() {
      ws.close(1000) // close normal code
    }
  })

  ws.on('close', () => {
    subscription.unsubscribe()
  })
})

router.get('/:name', async (req, res) => {
  const name = req.param('name')
  const data = await jobs.get(name)
  res.json(data)
})

export default router