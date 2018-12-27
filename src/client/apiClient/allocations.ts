import { AxiosInstance } from 'axios'

import { Allocation } from '@shared/types'
import absolutify from '@utils/absolutify'

import { routes } from '.'

export default (client: AxiosInstance) => {

  const fetchJobAllocations = async (jobId: string) => {
    const { data } = await client.get<Allocation[]>(routes.allocationsOfJob(jobId))
    return data
  }

  const wsJobAllocations = (jobId: string) => {
    const url = absolutify(routes.allocationsOfJob(jobId), 'ws:')
    const ws = new WebSocket(url)
    return ws
  }

  return {
    fetchJobAllocations,
    wsJobAllocations
  }
}