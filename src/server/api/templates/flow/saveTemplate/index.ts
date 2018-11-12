import { Observable, Observer } from 'rxjs'

import { Template } from '@model/index'
import ProcessingMessage, { Event } from '@shared/types/ProcessingMessage'
import logger, { log } from '@common/logger'

import parseParams from './parseParams'
import nomadParse from './nomadParse'
import saveToDb from './saveToDb'


const saveTemplate = (template: Template) => {
  const flow = Observable.create(async (observer: Observer<ProcessingMessage>) => {
    try {
      observer.next({ event: Event.PARSE_PARAMETERS, status: 'start' })
      template.parameters = parseParams(template.jobHCL!)
      observer.next({ event: Event.PARSE_PARAMETERS, status: 'end' })
    } catch(err) {
      log('error', err)
      observer.error({ event: Event.PARSE_PARAMETERS, status: 'error', params: { reason: 'TODO' } })
      return
    }

    try {
      observer.next({ event: Event.NOMAD_PARSE, status: 'start' })
      template.jobJSON = await nomadParse(template.jobHCL!)
      observer.next({ event: Event.NOMAD_PARSE, status: 'end' })
    } catch(err) {
      log('error', err)
      observer.error({ event: Event.NOMAD_PARSE, status: 'error', params: { reason: 'TODO' } })
      return
    }

    try {
      observer.next({ event: Event.SAVING, status: 'start' })
      const id = await saveToDb(template)
      observer.next({ event: Event.SAVING, status: 'end', params: { id, name: template.name } })
    }
    catch(err) {
      log('error', err)
      observer.error({ event: Event.SAVING, status: 'error', params: { reason: 'TODO' } })
      return
    }

    observer.complete()
  })

  return flow
}

export default saveTemplate