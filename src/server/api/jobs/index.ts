import express from 'express'

import { getJob, getJobs } from '../../nomadClient'

const router = express.Router()

router.get('/', async (req, res) => {
  const data = await getJobs()
  res.json(data)
})

router.get('/:name', async (req, res) => {
  const name = req.param('name')
  const data = await getJob(name)
  res.json(data)
})

export default router