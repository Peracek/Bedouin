import { AxiosInstance, AxiosResponse } from 'axios'

// import APIError from '@common/APIError'
// import notify from '@common/notify'
import JobSummary from '@shared/types/JobSummary'

import { Routes } from '.'

export type JobsApi = {
  fetch: () => Promise<JobSummary[]>,
}
export default (routes: Routes, client: AxiosInstance) => {
  
  const fetch: JobsApi['fetch'] = async () => {
    const { data } = await client.get<JobSummary[]>(routes.jobs)
    return data
  }

  return {
    fetch
  }
}