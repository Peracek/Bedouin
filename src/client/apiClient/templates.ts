import { AxiosInstance, AxiosResponse } from 'axios'

import absolutify from '@utils/absolutify'
import APIError from '@common/APIError'
import notify from '@common/notify'
import { Template } from '@shared/types/Template'

import { Routes } from '.'

export type TemplatesApi = {
  fetch: () => Promise<Template[]>,
  upload: (name: string, file: File) => Promise<{ location: string }>
}
export default (routes: Routes, client: AxiosInstance) => {
  
  const fetch: TemplatesApi['fetch'] = async () => {
    const { data } = await client.get<Template[]>(routes.templates)
    return data
  }

  const upload: TemplatesApi['upload'] = async (name, file) => {
    const data = new FormData()
    data.append('name', name)
    data.append('file', file)

    return client.post(routes.templates, data)
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
        throw err
      })
  }


  return {
    fetch,
    upload
  }
}