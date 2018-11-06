import express, { RequestHandler, ErrorRequestHandler } from 'express'

import { APIError, APIErrorType } from '@common/APIError'

import { 
  isNameUnique,
  processUploadedTemplate,
  getUploadProcessing,
  getTemplate
} from './controller'
import uploadHandler from './uploadHandler'


const router = express.Router()

router.get('/', async (req, res) => {
  const templates = await getTemplate()
  res.json(templates)
})


const processTemplateHandler: RequestHandler = (req, res, next) => {
  const { body: { name }, baseUrl } = req
  const templateFile = req.file.buffer
  const template = {
    name,
    jobDescription: templateFile.toString()
  }
  try {
    processUploadedTemplate(template)
  } catch(err) {
    if(err instanceof APIError) {
      res.status(err.status)
      res.send(err.body)
    } else {
      next(err)
    }
  }
  res.location(`${baseUrl}/${name}`)
  res.sendStatus(202)
}

router.post('/',
  uploadHandler('file'),
  ((err, _, res, next) => {
    if(err instanceof APIError) {
      res.status(err.status)
      res.send(err.body)
    } else {
      next(err)
    }
  }) as ErrorRequestHandler,
  processTemplateHandler
)

router.ws('/:templateName', async (ws, req) => {
  const { templateName } = req.params
  const processing = getUploadProcessing(templateName)
  if(processing == undefined) {
    ws.close(4000, 'not found - never existed or timeouted')
    return
  }
  processing.subscribe(
    val => ws.send(JSON.stringify(val)),
    err => ws.send(JSON.stringify(err)),
    () => ws.close(1000)
  )
})


export default router