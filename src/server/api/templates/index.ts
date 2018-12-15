import express from 'express'

import { getTemplateDirs } from './controller'

const router = express.Router()


router.get('/', async (_, res) => {
  const templateDirs = await getTemplateDirs()
  res.json(templateDirs)
})

router.get('/:id', (req, res) => {
  // send template and params spec
})

router.post('dryRun', (req, res) => {
  // render and dry run
})

router.post('/deploy', (req, res) => {
  // render template with params, deploy, send back location of a job
})

export default router