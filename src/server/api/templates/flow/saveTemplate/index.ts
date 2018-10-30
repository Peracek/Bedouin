import { Observable, Observer } from 'rxjs'

import * as types from '@types'
import logger, { log } from '@common/logger'

import validateBrackets from './validateBrackets'
import validateByNomad from './validateByNomad'
import saveToDb from './saveToDb'


const saveTemplate = (template: types.Template) => {
  const { jobDescription } = template

  const flow = Observable.create(async (observer: Observer<types.ProcessingMessage>) => {
    try {
      observer.next({ name: 'bracket_validation', status: 'start' })
      await validateBrackets(jobDescription)
      observer.next({ name: 'bracket_validation', status: 'end' })
    } catch(err) {
      observer.error({ name: 'bracket_validaton', status: 'error', params: { reason: 'TODO' } })
      return
    }

    try {
      observer.next({ name: 'nomad_validation', status: 'start' })
      await validateByNomad(jobDescription)
      observer.next({ name: 'nomad_validation', status: 'end' })
    } catch(err) {
      observer.error({ name: 'nomad_validation', status: 'error', params: { reason: 'TODO' } })
      return
    }

    try {
      observer.next({ name: 'saveing', status: 'start' })
      await saveToDb(template)
      observer.next({ name: 'save', status: 'end' })
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