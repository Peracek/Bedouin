import { AxiosInstance } from 'axios'

import { TemplateDir } from '@shared/types/TemplateDir'

import { Routes } from '.'

export type TemplatesApi = {
  fetch: () => Promise<TemplateDir[]>
}
export default (routes: Routes, client: AxiosInstance) => {
  
  const fetch: TemplatesApi['fetch'] = async () => {
    const { data } = await client.get<TemplateDir[]>(routes.templates)
    return data
  }

  return {
    fetch
  }
}