import express from 'express'
import { Observable } from 'rxjs';

import { allocations } from 'nomadClient'
import { Allocation } from 'nomadClient/types'

const router = express.Router()

router.ws('/', (ws, req) => {
  const { deployment: deplId, job: jobId } = req.query

  let observable: Observable<Allocation[]>
  if(deplId) {
    observable = allocations.observeOfDeployment(deplId)
  } else if (jobId) {
    observable = allocations.observeOfJob(jobId)
  } else {
    ws.close(undefined, 'Missing job or deployment query param')
    return
  }
  const subscription = observable.subscribe({
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

router.ws('/:id/logs/:task', (ws, req) => {
  const { id, task } = req.params
  const observable = allocations.observeTaskLogs(id, task)
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
  const { deployment: deplId, job: jobId } = req.query
  let data: Allocation[]
  if(deplId) {
    data = await allocations.getOfDeployment(deplId)
  } else if(jobId) {
    data = await allocations.getOfJob(jobId)
  } else {
    return res.status(400).send(`Missing query param 'job' or 'deployment'`)
  }
  res.json(data)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const data = await allocations.get(id)
  res.json(data)
})


export default router