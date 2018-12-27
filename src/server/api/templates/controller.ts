
import { TemplateDir } from '@shared/types/TemplateDir'
import { Template } from '@shared/types/Template'
import TemplateDeployDTO from '@shared/types/TemplateDeployDTO'
import { log } from '@common/logger'
import * as templateManager from 'templateManager'
import TemplateDefinition from 'templateManager/TemplateDefinition'
import { APIError, APIErrorType as ErrType } from 'api/APIError'
import { deployTemplate as deploy } from './flow/deployTemplate'

const getTemplateDirs = async (): Promise<TemplateDir[]> => {
  try {
    const templates = await templateManager.getTemplateDirs()
    return templates

  } catch(err) {
    log('error', err)
    if(err.code === 'ENOENT') {
      throw new APIError({ apiErrortype: ErrType.FILE_OR_DIRECTORY_NOT_FOUND, status: 400 })
    } else {
      throw err
    }
  }
}

const getTemplate = async (dirPath: string) => {
  let templateDef: TemplateDefinition
  try {
    templateDef = await templateManager.getTemplate({ dirPath })
  } catch(err) {
    if(err.code === 'ENOENT') {
      throw new APIError({ apiErrortype: ErrType.FILE_OR_DIRECTORY_NOT_FOUND, status: 400 })
    } else {
      throw err
    }
  }
  
  const result: Template = {
    dirName: dirPath,
    templateSpec: templateDef.templateSpec,
    parametersSpec: templateDef.paramsSpec
  }
  // return templateDef
  return result
}

const deployTemplate = async (dirPath: string, paramValues: {[key: string]: any}): Promise<TemplateDeployDTO> => {
  let templateDef: TemplateDefinition
  let jobName: string

  try {
    templateDef = await templateManager.getTemplate({ dirPath })
  } catch(err) {
    if(err.code === 'ENOENT') {
      throw new APIError({ apiErrortype: ErrType.FILE_OR_DIRECTORY_NOT_FOUND })
    } else {
      throw err
    }
  }
  try {
    jobName = await deploy(templateDef, paramValues)
  } catch(err) {
    throw err
  }

  return { jobName }
}


export { 
  getTemplateDirs,
  getTemplate,
  deployTemplate
}