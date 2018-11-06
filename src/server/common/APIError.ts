import { APIErrorType, APIErrorBody } from '@shared/types/APIErrorBody'

type Params = { [key: string]: string }
class APIError extends Error {
  static body(apiErrorType: APIErrorType, params: Params ) {
    return ({
      error: {
        type: apiErrorType,
        params
        // TODO:
        // description,
      }
    }) as APIErrorBody
  }

  apiErrortype: APIErrorType
  status: number
  params: Params

  constructor(apiErrortype: APIErrorType, status?: number, params?: Params, message?: string) {
    super()
    this.apiErrortype = apiErrortype
    this.status = status || 400
    this.params = params || {}
    this.message = message || apiErrortype
  }

  get body() {
    return APIError.body(this.apiErrortype, this.params)
  }

  addParam(key: string, value: string) {
    this.params.key = value
  }
}

export { APIError, APIErrorType }