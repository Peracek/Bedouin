import { AxiosInstance, AxiosResponse } from 'axios'

// import APIError from '@common/APIError'
// import notify from '@common/notify'
import { JobItem } from '@shared/types'

import { routes } from '.'

export type JobsApi = {
  fetch: () => Promise<JobItem[]>,
}
export default (client: AxiosInstance) => {
  
  const fetch: JobsApi['fetch'] = async () => {
    const { data } = await client.get<JobItem[]>(routes.jobs)
    return data
  }

  return {
    fetch
  }
}