import { ProcessingEvent } from '../processingMessages'

export type ProcessingMessage = {
  event: ProcessingEvent,
  status: 'start' | 'end' | 'error'
  params?: {
    [key: string]: any
  }
}
