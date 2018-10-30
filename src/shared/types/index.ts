export type ProcessingMessage = {
  name: string,
  status: 'start' | 'end' | 'error'
  params?: {
    [key: string]: any
  }
}
