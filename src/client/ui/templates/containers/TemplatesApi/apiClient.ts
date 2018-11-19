import axios, { AxiosResponse } from 'axios'

import absolutify from '@utils/absolutify'
import { Template } from '@shared/types/Template'
import APIError from '@common/APIError'
import notify from '@common/notify'

export const fetchTemplates = () => {
  return axios.get('api/templates')
    .then(({ data }) => {
      return data as Template[]
    })
}

export const uploadTemplate = (name: string, file: File) => {
  const data = new FormData()
  data.append('name', name)
  data.append('file', file)

  return axios.post('api/templates', data)
    .then(response => {
      let location: string = response.headers.location
      location = absolutify(location, 'ws:')
      return { location }
    })
    .catch(err => {
      const data = (err.response as AxiosResponse).data
      if(APIError.isAPIErrorBody(data)) {
        throw new APIError(data)
      }
      notify.error('Request error')
    })
}