import { AxiosInstance } from 'axios'

import { Template, TemplateParameter } from '@shared/types/Template'
import normalize from '@utils/normalizeFormValues'
import { Routes } from '.'


export type TemplateApi = {
  fetch: () => Promise<Template>
  postParameters: (parameters: TemplateParameter[]) => Promise<void>
  runTemplate: (values: { [key: string]: any }) => Promise<void>
}
export default (routes: Routes, client: AxiosInstance) => 
  (templateId: string) => {
    const id = templateId

    const fetch: TemplateApi['fetch'] = async () => {
      const { data } = await client.get<Template>(routes.template(id))
      return data
    }

    const postParameters: TemplateApi['postParameters'] = async parameters => {
      const body = { 
        parameters: parameters.map(p => normalize(p))
      }
      await client
        .post(routes.templateParams(templateId), body)
      return
    }

    const runTemplate: TemplateApi['runTemplate'] = async values => {
      await client
        .post(routes.runTemplate(templateId), values)
      return
    }

    return {
      fetch,
      postParameters,
      runTemplate
    }
  }