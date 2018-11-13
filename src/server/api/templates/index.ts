import express, { RequestHandler, ErrorRequestHandler } from 'express'

import { APIError, APIErrorType } from '@common/APIError'
import { TemplateParameter } from '@model/Template';

import { 
  isNameUnique,
  processUploadedTemplate,
  getUploadProcessing,
  getTemplate,
  saveParameters
} from './controller'
import uploadHandler from './uploadHandler'


const router = express.Router()

router.get('/', async (req, res) => {
  const templates = await getTemplate()
  res.json(templates)
})

router.get('/:name', async (req, res) => {
  const { name } = req.params
  const template = await getTemplate({ name })
  res.json(template)
})

router.post('/:name/parameters', async (req, res) => {
  const { name } = req.params
  const parameters = req.body as TemplateParameter[]
  saveParameters(parameters, name)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(() => {
      res.sendStatus(400)
    })
})

const processTemplateHandler: RequestHandler = (req, res, next) => {
  const { body: { name }, baseUrl } = req
  const templateFile = req.file.buffer
  const template = {
    name,
    jobHCL: templateFile.toString()
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
    err => { ws.send(JSON.stringify(err)); ws.close(4001) },
    () => ws.close(1000)
  )
})


export default router