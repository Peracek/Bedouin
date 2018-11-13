import axios, { AxiosResponse } from 'axios'
import { mapValues, trim } from 'lodash'

import { isAPIErrorBody } from '@shared/types/APIErrorBody'
import { Template, TemplateParameter } from '@shared/types/Template'
import absolutify from '@utils/absolutify'


export const fetchTemplate = (id: string) =>
  axios
    .get(`/api/templates/${id}`)
    .then(response => {
      return response.data as Template
    })

export const handleFileUpload = (name: string, file: File) => {
  const data = new FormData()
  data.append('name', name)
  data.append('file', file)

  return axios
    .post('/api/templates', data)
    .then(response => {
      let { location } = response.headers
      location = absolutify(location, 'ws:')
      return { location }
    })
    .catch(err => {
      if(err.response) {
        const data = (err.response as AxiosResponse).data
        if(isAPIErrorBody(data)) {
          return data // FIXME: translate this to something useful
        }
      }
      throw err
    })
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
export const postParameters = (parameters: TemplateParameter[], templateName: string) => {
  parameters.map(p => normalizeParameterValues(p))
  axios
    .post(`/api/templates/${templateName}/parameters`, parameters)
}
// export const handleParametersUpdate = (values: TemplateParameter[]) => {
//   values = values.map(normalizeParameterValues)



//   axios
//     .post(`/api/templates/${}`)
// }
