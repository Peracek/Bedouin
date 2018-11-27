import React from 'react'

import Templates from './templates/screens/Templates'
import TemplateDetail from './templates/screens/TemplateDetail'
import Jobs from './jobs/screens/Jobs'
import JobDetail from './jobs/screens/JobDetail'

const routes = {
  index: {
    path: '/',
    exact: true,
    component: () => <div>Hello</div>
  },
  templates: {
    path: '/templates',
    exact: true,
    component: Templates,
  },
  templateDetail: {
    path: '/templates/:id',
    exact: false,
    component: TemplateDetail,
    pathWithId: (id: string) => `/templates/${id}`
  },
  templateRun: {
    path: '/templates/:id/run',
    exact: false,
    pathWithId: (id: string) => `/templates/${id}/run`
  },
  jobs: {
    path: '/jobs',
    exact: true,
    component: Jobs
  },
  jobDetail: {
    path: '/jobs/:id',
    exact: true,
    component: JobDetail,
    pathWithId: (id: string) => `/jobs/${id}`
  }
}


export default routes