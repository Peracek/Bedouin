import NodeCache from 'node-cache'
import { Observable, ReplaySubject } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { APIError, APIErrorType } from '@common/APIError'
import * as types from '@types'
import ProcessingMessage from '@shared/types/ProcessingMessage'
import Template from '@model/Template'
import saveTemplateFlow from './flow/saveTemplate'


type Processing = Observable<ProcessingMessage>
const uploadProcessings = new NodeCache<Processing>({
  stdTTL: 900,
  useClones: false // what happens to subscribers if it gets deleted?
})


export const isNameUnique = async (name: string) => {
  Template.findOne
  const exists = await Template.findOne({ name }).then(doc => !!doc)
  return !exists
}

/**
 * Starts processing of uploaded template. Progress is observed by observable.
 */
export const processUploadedTemplate = (template: types.Template) => {
  if(!isNameUnique(template.name)) {
    throw new APIError(APIErrorType.TEMPLATE_NAME_NOT_UNIQUE, 409, { field: 'name' })
  }

  const flow = saveTemplateFlow(template)
  const process = new ReplaySubject<ProcessingMessage>()
  flow.subscribe(process)
  
  uploadProcessings.set(template.name, process)

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

export const getTemplate = async (options?: { id: string }) => {
  const id = options && options.id
  // return single record
  if(id) {
    return await Template.findById(id)
  }
  
  // return all records
  return await Template.find()
}

