import axios, { AxiosResponse } from 'axios'
import { mapValues, trim } from 'lodash'

import { Template, TemplateParameter } from '@shared/types/Template'

export type ApiClient = {
  fetchTemplate: () => Promise<Template>
  postParameters: (parameters: TemplateParameter[]) => Promise<TODO>
  runTemplate: (values: TODO) => Promise<TODO>
}

const endpoint = {
  template: (id: string) => `/api/templates/${id}`,
  templateParams: (id: string) => `/api/templates/${id}/parameters`,
  runTemplate: (id: string) => `/api/templates/${id}/run`
}

const normalizeParameterValues = (param: TemplateParameter) => {
  return mapValues(param, val => {
    if(typeof val === 'string') {
      const trimmed = trim(val)
      return trimmed.length === 0 ? null : trimmed
    }
    return val
  }) as TemplateParameter
}


export default (templateId: string): ApiClient => ({
  fetchTemplate: () => (
    axios
      .get(endpoint.template(templateId))
      .then(response => {
        return response.data as Template
      })
  ),

  postParameters: (parameters: TemplateParameter[]) => {
    parameters.map(p => normalizeParameterValues(p))
    return axios
      .post(endpoint.templateParams(templateId), parameters)
  },

  runTemplate: (values: { [key: string]: any }) => {
    return axios
      .post(endpoint.runTemplate(templateId), values)
      // .then(response => {

      // })
      // .catch(err => {

      // })
  }
})