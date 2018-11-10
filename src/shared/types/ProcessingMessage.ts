export enum Event {
  PARSE_PARAMETERS,
  NOMAD_PARSE,
  SAVING
}

export const EventNames = new Map<Event, string>([
  [Event.PARSE_PARAMETERS, "Parsing parameters"],
  [Event.NOMAD_PARSE, "Job description validation"],
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