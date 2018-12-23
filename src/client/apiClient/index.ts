import axios from 'axios'

import createTemplatesApi, { TemplatesApi } from './templates'
import createTemplateApi, { TemplateApi } from './template'
import createJobsApi, { JobsApi } from './jobs'
import createJobApi, { JobApi } from './job'
import createAllocationsApi, { AllocationsApi } from './allocations'

export const routes = {
  jobs: `jobs`,
  // job: (id: string) => `jobs/${id}`,
  deployments: (jobId: string) => `jobs/${jobId}/deployments`,
  templates: `templates`,
  template: (id: string) => `templates/${id}`,
  templateParams: (id: string) => `templates/${id}/parameters`,
  deployTemplate: (id: string) => `templates/${id}/deploy`,
  allocations: (deplId: string) => `allocations?deployment=${deplId}`,
  allocationStats: (id: string) => `allocations/${id}/stats`
}
const client = axios.create({
  baseURL: '/api'
})

export type Routes = typeof routes

export { TemplatesApi, TemplateApi, JobApi, JobsApi, AllocationsApi }
export const templatesApi = createTemplatesApi(routes, client)
export const templateApi = createTemplateApi(routes, client)
export const jobsApi = createJobsApi(routes, client)
export const jobApi = createJobApi(routes, client)
export const allocationsApi = createAllocationsApi(routes, client)
