import express, { RequestHandler } from 'express'

import { 
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


const processTemplateHandler: RequestHandler = (req, res) => {
  const { body: { name }, baseUrl } = req
  const templateFile = req.file.buffer
  const template = {
    name,
    jobDescription: templateFile.toString()
  }
  processUploadedTemplate(template)
  res.location(`${baseUrl}/${name}`)
  res.sendStatus(202)
}

router.post('/',
  uploadHandler('file'),
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