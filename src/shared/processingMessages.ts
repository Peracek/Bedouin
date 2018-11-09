export enum ProcessingEvent {
  BRACKET_VALIDATION,
  NOMAD_PARSE,
  SAVING
}

export const ProcessingEventsNames = new Map<ProcessingEvent, string>([
  [ProcessingEvent.BRACKET_VALIDATION, "Bracket validation"],
  [ProcessingEvent.NOMAD_PARSE, "Parsing"],
  [ProcessingEvent.SAVING, "Saving"],
])