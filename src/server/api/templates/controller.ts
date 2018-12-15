
import TemplateDir from '@shared/types/TemplateDir'
import { APIError, APIErrorType as ErrType } from 'api/APIError'
import * as templateManager from 'templateManager'

const getTemplateDirs = async (): Promise<TemplateDir[]> => {
  try {
    const templates = await templateManager.getTemplateDirs()
    return templates

  } catch(err) {
    if(err.code === 'ENOENT') {
      throw new APIError({ apiErrortype: ErrType.FILE_OR_DIRECTORY_NOT_FOUND, status: 400 })
    } else {
      throw err
    }
  }
}



export { getTemplateDirs }