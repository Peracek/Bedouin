import axios from 'axios'

import createTemplatesApi, { TemplatesApi } from './templates'
import createTemplateApi, { TemplateApi } from './template'

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

export { TemplatesApi, TemplateApi }
export const templatesApi = createTemplatesApi(routes, client)
export const templateApi = createTemplateApi(routes, client)
