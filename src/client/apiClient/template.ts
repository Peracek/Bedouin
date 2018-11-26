import { AxiosInstance, AxiosResponse } from 'axios'

import { Template, TemplateParameter } from '@shared/types/Template'
import { mapValues, trim } from 'lodash'

import { Routes } from '.'


const normalizeParameterValues = (param: TemplateParameter) => {
  return mapValues(param, val => {
    if(typeof val === 'string') {
      const trimmed = trim(val)
      return trimmed.length === 0 ? null : trimmed
    }
    return val
  }) as TemplateParameter
}


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
      parameters.map(p => normalizeParameterValues(p))
      await client
        .post(routes.templateParams(templateId), parameters)
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