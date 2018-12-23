import express from 'express'

import { allocations } from 'nomadClient'
import { Allocation } from 'nomadClient/types'

const router = express.Router()

router.ws('/', (ws, req) => {
  const { deployment: deplId } = req.query
  if(!deplId) {
    ws.close(undefined, 'Missing job query param')
    return
  }
  const subscription = allocations.observeOfDeployment(deplId).subscribe({
    next(allocs) {
      ws.send(JSON.stringify(allocs))
    },
    error() {
      ws.close(1011)
    },
    complete() {
      ws.close(1000)
    }
  })

  ws.on('close', () => {
    subscription.unsubscribe()
  })
})

router.ws('/:id/logs', (ws, req) => {
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

router.ws('/:id/stats', (ws, req) => {
  const { id } = req.params
  const observable = allocations.observeStats(id)
  const subscription = observable.subscribe({
    next(stats) {
      ws.send(JSON.stringify(stats))
    },
    error() {
      ws.close(1011)
    },
    complete() {
      ws.close(1000)
    }
  })
  
  ws.on('close', () => {
    subscription.unsubscribe()
  })
})

router.get('/', async (req, res) => {
  const { deployment: deplId } = req.query
  let data: Allocation[]
  if(deplId) {
    data = await allocations.getOfDeployment(deplId)
  } else {
    const response = await allocations.getAll()
    data = response.data
  }
  res.json(data)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const data = await allocations.get(id)
  res.json(data)
})


export default router