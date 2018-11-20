import express from 'express'

import { getJob } from '../../nomadClient'

const router = express.Router()

router.get('/:name', async (req, res) => {
  const name = req.param('name')
  const data = await getJob(name)
  res.json(data)
})

export default router