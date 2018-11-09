export enum Event {
  BRACKET_VALIDATION,
  NOMAD_PARSE,
  SAVING
}

export const EventNames = new Map<Event, string>([
  [Event.BRACKET_VALIDATION, "Bracket validation"],
  [Event.NOMAD_PARSE, "Parsing"],
  [Event.SAVING, "Saving"],
])

type ProcessingMessage = {
  event: Event,
  status: 'start' | 'end' | 'error'
  params?: {
    [key: string]: any
  }
}

export default ProcessingMessage