import { AxiosInstance } from 'axios'

import { Deployment } from '@shared/types'

import { routes, toWsUrl } from '.'

export default (client: AxiosInstance) => {
  
  const fetchDeployments = async (jobId: string) => {
    const { data } = await client.get<Deployment[]>(routes.deployments(jobId))
    return data
  }

  const wsJobSummary = (jobId: string) => {
    const url = toWsUrl(routes.jobSummary(jobId))
    const ws = new WebSocket(url)
    return ws
  }

  const wsJobSpec = (jobId: string) => {
    const url = toWsUrl(routes.jobSpec(jobId))
    const ws = new WebSocket(url)
    return ws
  }

  return {
    fetchDeployments,
    wsJobSummary,
    wsJobSpec
  }
}