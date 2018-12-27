import { AxiosInstance } from 'axios'

import { Allocation } from '@shared/types'

import { routes, toWsUrl } from '.'

export default (client: AxiosInstance) => {

  const fetchJobAllocations = async (jobId: string) => {
    const { data } = await client.get<Allocation[]>(routes.allocationsOfJob(jobId))
    return data
  }

  const wsJobAllocations = (jobId: string) => {
    const url = toWsUrl(routes.allocationsOfJob(jobId))
    const ws = new WebSocket(url)
    return ws
  }

  return {
    fetchJobAllocations,
    wsJobAllocations
  }
}