import { APIErrorType, APIErrorBody } from '@shared/types/APIErrorBody'

type Params = { [key: string]: string }
type Options = {
  apiErrortype?: APIErrorType,
  status?: number,
  params?: Params
}
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

  static fromStatus(status: number) {
    return new APIError({ status })
  }

  apiErrortype: APIErrorType
  status: number
  params: Params

  constructor(options: Options) {
    super()
    const {
      apiErrortype,
      status,
      params
    } = options
    this.apiErrortype = apiErrortype || APIErrorType.NONE
    this.status = status || 400
    this.params = params || {}
  }

  get body() {
    return APIError.body(this.apiErrortype, this.params)
  }

  addParam(key: string, value: string) {
    this.params.key = value
  }
}

export { APIError, APIErrorType }
