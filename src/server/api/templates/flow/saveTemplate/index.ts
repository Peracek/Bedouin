import { Observable, Observer } from 'rxjs'

import * as types from '@types'
import ProcessingMessage, { Event } from '@shared/types/ProcessingMessage'
import logger, { log } from '@common/logger'

import validateBrackets from './validateBrackets'
import parse from './parse'
import saveToDb from './saveToDb'


const saveTemplate = (template: types.Template) => {
  const flow = Observable.create(async (observer: Observer<ProcessingMessage>) => {
    try {
      observer.next({ event: Event.BRACKET_VALIDATION, status: 'start' })
      await validateBrackets(template.jobHCL)
      observer.next({ event: Event.BRACKET_VALIDATION, status: 'end' })
    } catch(err) {
      log('error', err)
      observer.error({ event: Event.BRACKET_VALIDATION, status: 'error', params: { reason: 'TODO' } })
      return
    }

    try {
      observer.next({ event: Event.NOMAD_PARSE, status: 'start' })
      template.jobJSON = await parse(template.jobHCL)
      observer.next({ event: Event.NOMAD_PARSE, status: 'end' })
    } catch(err) {
      log('error', err)
      observer.error({ event: Event.NOMAD_PARSE, status: 'error', params: { reason: 'TODO' } })
    }

    try {
      observer.next({ event: Event.SAVING, status: 'start' })
      const id = await saveToDb(template)
      observer.next({ event: Event.SAVING, status: 'end', params: { id } })
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