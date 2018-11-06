import axios, { AxiosResponse } from 'axios'

import { isAPIErrorBody } from '@shared/types/APIErrorBody'
import absolutify from '@utils/absolutify'

const handleFileUpload = (name: string, file: File) => {
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

export default handleFileUpload