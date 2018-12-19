import { isAPIFormErrorBody, isAPIErrorBody } from '@shared/types/APIErrorBody'
import errorMessages from './errorMessages'

type body = { [key: string]: any }
class APIError extends Error {

  static isAPIErrorBody(responseBody: any) {
    return isAPIErrorBody(responseBody)
  }

  private body: body

  constructor(body: body) {
    super()
    this.body = body
  }

  get error() {
    if(isAPIErrorBody(this.body)) {
      return this.body
    }
    return null
  }

  get errorMessage() {
    if(!this.error) return
    return errorMessages.get(this.error.error.type)
  }

  get formError() {
    if(isAPIFormErrorBody(this.body)) {
      return this.body.error
    } else {
      return null
    }
  }
}

export default APIError