import { Observable, Observer } from 'rxjs'

import * as types from '@types'
import { ProcessingMessage } from '@shared/types'
import { ProcessingEvent as Event } from '@shared/processingMessages'
import logger, { log } from '@common/logger'

import validateBrackets from './validateBrackets'
import validateByNomad from './validateByNomad'
import saveToDb from './saveToDb'


const saveTemplate = (template: types.Template) => {
  const { jobDescription } = template

  const flow = Observable.create(async (observer: Observer<ProcessingMessage>) => {
    try {
      observer.next({ event: Event.BRACKET_VALIDATION, status: 'start' })
      await validateBrackets(jobDescription)
      observer.next({ event: Event.BRACKET_VALIDATION, status: 'end' })
    } catch(err) {
      observer.error({ event: Event.BRACKET_VALIDATION, status: 'error', params: { reason: 'TODO' } })
      return
    }

    try {
      observer.next({ event: Event.NOMAD_VALIDATION, status: 'start' })
      await validateByNomad(jobDescription)
      observer.next({ event: Event.NOMAD_VALIDATION, status: 'end' })
    } catch(err) {
      observer.error({ event: Event.NOMAD_VALIDATION, status: 'error', params: { reason: 'TODO' } })
      return
    }

    try {
      observer.next({ event: Event.SAVING, status: 'start' })
      await saveToDb(template)
      observer.next({ event: Event.SAVING, status: 'end' })
    }
    catch(err) {
      observer.error({ name: 'nomad_validation', status: 'error', params: { reason: 'TODO' } })
      return
    }

    observer.complete()
  })

  return flow
}

export default saveTemplate