import { includes } from 'lodash'

export enum APIErrorType {
  FILE_OR_DIRECTORY_NOT_FOUND = "file_or_directory_not_found",
  TEMPLATE_NAME_NOT_UNIQUE = "template_name_not_unique",
  TEMPLATE_FILE_BAD_EXTENSION = "template_file_bad_extension",
  TEMPLATE_RENDER_ERROR = "template_render_error",
  JOB_PARSE_ERROR = "job_parse_error",
  JOB_RUN_ERROR = "job_run_error",
  NONE = "none"
}

export interface APIErrorBody {
  error: {
    type: APIErrorType,
    description?: string,
    params?: { [key: string]: string }
  }
}

export interface APIFormErrorBody extends APIErrorBody {
  error: APIErrorBody['error'] & {
    params: APIErrorBody['error']['params'] & {
      field: string
    }
  }
}

export const isAPIErrorBody = (obj: object): obj is APIErrorBody => {
  return (<APIErrorBody>obj).error && includes(APIErrorType, (<APIErrorBody>obj).error.type)
}

export const isAPIFormErrorBody = (obj: object): obj is APIFormErrorBody => {
  if(isAPIErrorBody(obj)) {
    return Boolean((<APIFormErrorBody>obj).error.params.field)
  }
  return false
}
