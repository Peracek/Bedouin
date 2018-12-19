import express from 'express'

import TemplateDeployDTO from '@shared/types/TemplateDeployDTO'
import { getTemplateDirs, getTemplate, deployTemplate } from './controller'

const router = express.Router()


router.get('/', async (_, res) => {
  const templateDirs = await getTemplateDirs()
  res.json(templateDirs)
})

router.get('/:dirName', async (req, res) => {
  const { dirName } = req.params as any
  const templateDef = await getTemplate(dirName)
  res.json(templateDef)
})

router.post('dryRun', (req, res) => {
  // render and dry run
})

router.post('/:dirName/deploy', async (req, res, next) => {
  // render template with params, deploy, send back location of a job
  const { body, params: { dirName } } = req
  let data: TemplateDeployDTO
  try {
    data = await deployTemplate(dirName, body)
  } catch(err) {
    next(err)
    return
  }
  res.json(data)
})

export default router