import express from 'express'

import { allocations } from 'nomadClient'

const router = express.Router()

router.get('/', async (_, res) => {
  const { data } = await allocations.getAll()
  res.json(data)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { data } = await allocations.get(id)
  res.json(data)
})

router.ws('/:id/logs', async (ws, req) => {
  const { id } = req.params
  const observable = allocations.observeLogs(id)
  const subscription = observable.subscribe({
    next(logChunk) {
      ws.send(logChunk)
    },
    error() {
      ws.close(1011) // server error code
    },
    complete() {
      ws.close(1000)
    }
  })

  ws.on('close', () => {
    subscription.unsubscribe()
  })
})

export default router