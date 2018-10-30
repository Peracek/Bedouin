export class AppError extends Error {
  protected code: string

  constructor(code: string, message?: string) {
    super(message)
    this.code = code
  }
}


type Params = { [key: string]: string }
export class APIError extends Error {
  public readonly httpCode?: number
  public readonly params?: Params

  constructor(message: string, params?: Params)
  constructor(message: string, params?: Params, httpCode?: number)
  constructor(message: string, params?: Params, httpCode?: number) {
    super(message)
    if(httpCode) this.httpCode = httpCode
    if(params) this.params = params
  }

  public toJSON() {
    return JSON.stringify({
      error: {
        message: this.message,
        params: this.params
      }
    })
  }

  public toResponse() {

  }
}