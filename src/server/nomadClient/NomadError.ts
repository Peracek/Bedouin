import { AxiosError } from 'axios'

export class NomadError extends Error implements AxiosError {
  config: AxiosError['config']
  code?: string
  request?: any
  response?: AxiosError['response']

  constructor(err: AxiosError) {
    super(err.message)
    this.config = err.config
    this.code = err.code
    this.request = err.request
    this.response = err.response
  }

}