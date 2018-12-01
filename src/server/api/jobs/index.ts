import express from 'express'

import { getJob, getJobs } from '../../nomadClient'
import { obs } from '../../nomadClient/jobs'

const router = express.Router()

router.get('/', async (req, res) => {
  const data = await getJobs()
  // poslat res.location() kde budou websocketi updates?
  res.json(data)
})

router.ws('/', async (ws, req) => {
  const subscription = obs.subscribe({
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
  const data = await getJob(name)
  res.json(data)
})

export default router