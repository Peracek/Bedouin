import express, { RequestHandler, ErrorRequestHandler } from 'express'

import { APIError } from '@common/APIError'
import { TemplateParametersDTO } from '@shared/types/Template'

import { 
  // isNameUnique,
  processUploadedTemplate,
  getUploadProcessing,
  getTemplate,
  getTemplates,
  saveParameters,
  runTempate
} from './controller'
import uploadHandler from './uploadHandler'


const router = express.Router()

router.get('/', async (req, res) => {
  const templates = await getTemplates()
  res.json(templates.map(t => t.toObject()))
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const template = await getTemplate({ id })
  if(!template) {
    throw APIError.fromStatus(404)
  }
  res.json(template.toObject())
})

router.post('/:id/parameters', async (req, res) => {
  const { id } = req.params
  const { parameters } = req.body as TemplateParametersDTO
  debugger
  saveParameters(parameters, id)
    .then((mon) => {
      debugger
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

router.post('/:id/run', (req, res) => {
  const { body, params: { id } } = req
  runTempate(id, body)
  return res.sendStatus(200)
})


export default router