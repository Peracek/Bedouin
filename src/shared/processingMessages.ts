export enum ProcessingEvent {
  BRACKET_VALIDATION,
  NOMAD_VALIDATION,
  SAVING
}

export const ProcessingEventsNames = new Map<ProcessingEvent, string>([
  [ProcessingEvent.BRACKET_VALIDATION, "Bracket validation"],
  [ProcessingEvent.NOMAD_VALIDATION, "Nomad validation"],
  [ProcessingEvent.SAVING, "Saving"],
])