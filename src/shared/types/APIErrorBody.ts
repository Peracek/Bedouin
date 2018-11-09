import { includes } from 'lodash'

export enum APIErrorType {
  TEMPLATE_NAME_NOT_UNIQUE = "template_name_not_unique",
  TEMPLATE_FILE_BAD_EXTENSION = "template_file_bad_extension",
  TEMPLATE_PARSE_ERROR = "template_parse_error",
  UNKNOWN = "unknown",
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
