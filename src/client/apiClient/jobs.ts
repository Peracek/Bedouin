import { AxiosInstance, AxiosResponse } from 'axios'

// import APIError from '@common/APIError'
// import notify from '@common/notify'
import Job from '@shared/types/Job'

import { Routes } from '.'

export type JobsApi = {
  fetch: () => Promise<Job[]>,
}
export default (routes: Routes, client: AxiosInstance) => {
  
  const fetch: JobsApi['fetch'] = async () => {
    const { data } = await client.get<Job[]>(routes.jobs)
    return data
  }

  return {
    fetch
  }
}