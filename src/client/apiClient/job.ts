import { AxiosInstance, AxiosResponse } from 'axios'

// import notify from '@common/notify'
import Job from '@shared/types/Job'

import { Routes } from '.'

export type JobApi = {
  fetch: (jobId: string) => Promise<Job>,
}
export default (routes: Routes, client: AxiosInstance) => {
  
  const fetch: JobApi['fetch'] = async (jobId) => {
    const { data } = await client.get<Job>(routes.job(jobId))
    return data
  }

  return {
    fetch
  }
}