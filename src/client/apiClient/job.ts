import { AxiosInstance } from 'axios'

// import notify from '@common/notify'
import Deployment from '@shared/types/Deployment'

import { Routes } from '.'

export type JobApi = {
  fetchDeployments: (jobId: string) => Promise<Deployment[]>,
}
export default (routes: Routes, client: AxiosInstance) => {
  
  const fetchDeployments: JobApi['fetchDeployments'] = async (jobId) => {
    const { data } = await client.get<Deployment[]>(routes.deployments(jobId))
    return data
  }

  return {
    fetchDeployments
  }
}