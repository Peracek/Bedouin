import { APIErrorType as Err } from '@shared/types/APIErrorBody'

export const ErrorMessages = new Map<Err, string>([
  [Err.JOB_PARSE_ERROR, "Error while job parsing"],
  [Err.JOB_RUN_ERROR, "Error while job deployment"]
])

export default ErrorMessages