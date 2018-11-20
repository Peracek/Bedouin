import NodeCache from 'node-cache'
import { Observable, ReplaySubject } from 'rxjs'
// import { flow, toPairs, forEach } from 'lodash/fp'

import { APIError, APIErrorType } from '@common/APIError'
import ProcessingMessage from '@shared/types/ProcessingMessage'
import TemplateModel, { Template, TemplateParameter } from '@model/Template'
import saveTemplateFlow from './flow/saveTemplate'
import runTemplateFlow from './flow/runTemplate'


type Processing = Observable<ProcessingMessage>
const uploadProcessings = new NodeCache<Processing>({
  stdTTL: 900,
  useClones: false // what happens to subscribers if it gets deleted?
})


export const isNameUnique = async (name: string) => {
  const exists = await TemplateModel.findOne({ name }).then(doc => !!doc)
  return !exists
}

/**
 * Starts processing of uploaded template. Progress is observed by observable.
 */
export const processUploadedTemplate = (template: Partial<Template>) => {
  if(!isNameUnique(template.name!)) {
    throw new APIError({ apiErrortype: APIErrorType.TEMPLATE_NAME_NOT_UNIQUE, status: 409, params: { field: 'name' }})
  }

  const flow = saveTemplateFlow(template)
  const process = new ReplaySubject<ProcessingMessage>()
  flow.subscribe(process)
  
  uploadProcessings.set(template.name!, process)

  process.subscribe(
    val => console.log(val),
    err => console.log(err),
    () => console.log('complete')
  )
}
export const getUploadProcessing = (templateName: string) => {
  const processing = uploadProcessings.get(templateName)
  if(!processing) {
    return
  }
  
  return processing
  // .pipe(
  //   catchError(err => {
  //     if(err instanceof AppError) {
  //       throw new APIError(err.message)
  //     }

  //     throw err
  //   })
  // )
}

export const getTemplates = () => {
  return TemplateModel.find()
}

export const getTemplate = (options: { id: string }) => {
  return TemplateModel.findById(options.id)
}

export const saveParameters = (parameters: TemplateParameter[], templateName: string) => {
  return TemplateModel.updateOne({ name: templateName }, { $set: { parameters } })
}

export const runTempate = async (templateId: string, values?: { [key: string]: any }) => {

  return runTemplateFlow(templateId, values)
  
  /**
   * 1. fetch template
   * 2. fill parameters
   * 3. post it to server
   * 4. save run to db <-- MISSING
   * 5. return done
   */
}