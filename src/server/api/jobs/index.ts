import express from 'express'

import observableToWS from '../observableToWS'
import { getJobs, getDeployments, observeDeployments, observeAll, observeSpec, observeSummary } from './controller'

const router = express.Router()

router.get('/', async (_, res) => {
  const jobs = await getJobs()
  res.json(jobs)
})

router.ws('/', (ws) => {
  observableToWS(observeAll(), ws)
})

router.ws('/:jobId/spec', (ws, req) => {
  const jobId = req.param('jobId')
  observableToWS(observeSpec(jobId), ws)
})

router.ws('/:jobId', (ws, req) => {
  const jobId = req.param('jobId')
  observableToWS(observeSummary(jobId), ws)
})

router.get('/:jobId/deployments', async (req, res) => {
  const jobId = req.param('jobId')
  const deployments = await getDeployments(jobId)
  res.json(deployments)
})

router.ws('/:jobId/deployments', (ws, req) => {
  const jobId = req.param('jobId')
  observableToWS(observeDeployments(jobId), ws)
})

export default router