import { jobs } from 'nomadClient'
import { NomadError } from 'nomadClient/NomadError'
import TemplateDefinition from "templateManager/TemplateDefinition"
import { APIError, APIErrorType as ErrType } from 'api/APIError'


export const deployTemplate = async (templateDef: TemplateDefinition, paramValues: {[key: string]: any}): Promise<string> => {

  let rendered: string
  let jobBody: {[key: string]: any}
  
  try {
    rendered = templateDef.render(paramValues)
  } catch(err) {
    throw new APIError({ apiErrortype: ErrType.TEMPLATE_RENDER_ERROR })
  }

  try {
    jobBody = await jobs.parse(rendered)
  } catch(err) {
    if(err instanceof NomadError) {
      throw new APIError({ apiErrortype: ErrType.JOB_PARSE_ERROR })
    }
    throw err
  }
  
  const { Name: name } = jobBody
  try {
    await jobs.deploy(name, jobBody)
  } catch(err) {
    if(err instanceof NomadError) {
      throw new APIError({ apiErrortype: ErrType.JOB_RUN_ERROR })
    }
    throw err
  }
  
  return name
}