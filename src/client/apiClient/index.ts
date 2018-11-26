import axios from 'axios'

import createTemplatesApi, { TemplatesApi } from './templates'
import createTemplateApi, { TemplateApi } from './template'
import createJobsApi, { JobsApi } from './jobs'
import createJobApi, { JobApi } from './job'

const routes = {
  jobs: `jobs`,
  job: (id: string) => `jobs/${id}`,
  templates: `templates`,
  template: (id: string) => `templates/${id}`,
  templateParams: (id: string) => `templates/${id}/parameters`,
  runTemplate: (id: string) => `templates/${id}/run`
}
const client = axios.create({
  baseURL: '/api'
})

export type Routes = typeof routes

export { TemplatesApi, TemplateApi, JobApi, JobsApi }
export const templatesApi = createTemplatesApi(routes, client)
export const templateApi = createTemplateApi(routes, client)
export const jobsApi = createJobsApi(routes, client)
export const jobApi = createJobApi(routes, client)
