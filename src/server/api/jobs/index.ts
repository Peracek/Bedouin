import express from 'express'

import { jobs } from '../../nomadClient'
import { getJobs, getDeployments, observeDeployments } from './controller'

const router = express.Router()

router.get('/', async (_, res) => {
  const jobs = await getJobs()
  res.json(jobs)
})

router.ws('/', (ws) => {
  const subscription = jobs.observeAll().subscribe({
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

router.get('/:jobId/deployments', async (req, res) => {
  const jobId = req.param('jobId')
  const deployments = await getDeployments(jobId)
  res.json(deployments)
})

router.ws('/:jobId/deployments', (ws, req) => {
  const jobId = req.param('jobId')
  const subscription = observeDeployments(jobId).subscribe({
    next(deployments) {
      ws.send(JSON.stringify(deployments))
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

export default router