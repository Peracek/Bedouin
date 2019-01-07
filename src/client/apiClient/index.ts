import axios from 'axios'

import absolutify from '@utils/absolutify'
import { authStorage }  from 'authentication'

import createTemplatesApi, { TemplatesApi } from './templates'
import createTemplateApi, { TemplateApi } from './template'
import createJobsApi, { JobsApi } from './jobs'
import createJobApi from './job'
import createAllocationsApi from './allocations'

export const baseURL = '/api'
export const routes = {
  jobs: `jobs`,
  jobSummary: (id: string) => `jobs/${id}`,
  jobSpec: (id: string) => `jobs/${id}/spec`,
  deployments: (jobId: string) => `jobs/${jobId}/deployments`,
  templates: `templates`,
  template: (id: string) => `templates/${id}`,
  templateParams: (id: string) => `templates/${id}/parameters`,
  deployTemplate: (id: string) => `templates/${id}/deploy`,
  allocationsOfJob: (jobId: string) => `allocations?job=${jobId}`,
  allocationStats: (id: string) => `allocations/${id}/stats`,
  allocationTaskLogs: (allocId: string, taskName: string) => `allocations/${allocId}/logs/${taskName}`
}
export const toWsUrl = (url: string) => absolutify(`${baseURL}/${url}`, 'ws:')

const client = axios.create({
  baseURL,
  headers: {
    Authorization: {
      toString () {
        return `Bearer ${authStorage.token}`
      }
    }
  }
})

export { TemplatesApi, TemplateApi, JobsApi }
export const templatesApi = createTemplatesApi(client)
export const templateApi = createTemplateApi(client)
export const jobsApi = createJobsApi(client)
export const jobApi = createJobApi(client)
export const allocationsApi = createAllocationsApi(client)
