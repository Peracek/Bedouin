import { AxiosInstance } from 'axios'

import Allocation from '@shared/types/Allocation'

import { Routes } from '.'

export type AllocationsApi = {
  fetchAllocations: (deplId: string) => Promise<Allocation[]>
}
export default (routes: Routes, client: AxiosInstance) => {

  const fetchAllocations: AllocationsApi['fetchAllocations'] = async (deplId) => {
    const { data } = await client.get<Allocation[]>(routes.allocations(deplId))
    return data
  }

  return {
    fetchAllocations
  }
}