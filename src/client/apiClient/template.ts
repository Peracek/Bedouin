import { AxiosInstance } from 'axios'

import { Template } from '@shared/types/Template'
import TemplateDeployDTO from '@shared/types/TemplateDeployDTO'
import APIError from './APIError'
import { routes } from '.'


export type TemplateApi = {
  fetch: () => Promise<Template>
  deployTemplate: (values: { [key: string]: any }) => Promise<string>
}
export default (client: AxiosInstance) => 
  (templateId: string) => {
    const id = templateId

    const fetch: TemplateApi['fetch'] = async () => {
      const { data } = await client.get<Template>(routes.template(id))
      return data
    }

    const deployTemplate: TemplateApi['deployTemplate'] = async values => {
      let jobName: string
      try {
        const { data } = await client
          .post<TemplateDeployDTO>(routes.deployTemplate(templateId), values)
        jobName = data.jobName
      } catch(err) {
        if(err.response) {
          if(APIError.isAPIErrorBody(err.response.data)) {
            throw new APIError(err.response.data)
          }
        }
        throw err
      }
      return jobName
    }

    return {
      fetch,
      deployTemplate
    }
  }