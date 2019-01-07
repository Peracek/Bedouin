import { jobs } from 'nomadClient'
import { Job } from 'nomadClient/types'
import { NomadError } from 'nomadClient/NomadError'
import TemplateDefinition from "templateManager/TemplateDefinition"
import { APIError, APIErrorType as ErrType } from 'api/APIError'


export const deployTemplate = async (templateDef: TemplateDefinition, paramValues: {[key: string]: any}, user?: {name: string, email:string}): Promise<string> => {

  let rendered: string
  let job: Job
  
  try {
    rendered = templateDef.render(paramValues)
  } catch(err) {
    throw new APIError({ apiErrortype: ErrType.TEMPLATE_RENDER_ERROR })
  }

  try {
    job = await jobs.parse(rendered)
  } catch(err) {
    if(err instanceof NomadError) {
      throw new APIError({ apiErrortype: ErrType.JOB_PARSE_ERROR })
    }
    throw err
  }

  job.Meta = {
    _b_author: JSON.stringify(user),
    _b_templateName: templateDef.dirPath,
    _b_templateChecksum: templateDef.checksum,
    _b_templateParameters: JSON.stringify(paramValues),
    ...job.Meta
  }
  
  const { Name: name } = job
  try {
    await jobs.deploy(job)
  } catch(err) {
    if(err instanceof NomadError) {
      throw new APIError({ apiErrortype: ErrType.JOB_RUN_ERROR })
    }
    throw err
  }
  
  return name
}