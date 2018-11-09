import axios from 'axios'

import { NomadError } from '@common/Errors'

const ENDPOINT = 'http://localhost:4646'

export const parseHCLToJSON = async (jobHCL: string) => {
  return axios({
    method: 'post',
    url: `${ENDPOINT}/v1/jobs/parse`,
    data: {
      JobHCL: jobHCL
    },
    responseType: 'json',
    transformResponse: res => res // do not parse response, leave it as string
  }).then(response => {
    return response.data as string
  }).catch(error => {
    if(error.response) {
      throw new NomadError('TODO', error)
    }
    throw error
  }) 
}
