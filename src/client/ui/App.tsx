import React from 'react'
import { Link, Route } from 'react-router-dom'

import Templates from './templates/screens/Templates'
import TemplateDetail from './templates/screens/TemplateDetail'
import Jobs from './jobs/screens/Jobs'

export const routes = [
  {
    path: '/',
    name: 'index',
    exact: true,
    component: () => <div>Hello</div>
  },
  {
    path: '/templates',
    name: 'templates',
    exact: true,
    component: Templates,
  },
  {
    path: '/templates/:id',
    name: 'templateDetail',
    exact: false,
    component: TemplateDetail
  },
  {
    path: '/jobs',
    name: 'jobs',
    exact: true,
    component: Jobs
  }
]

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/templates">Templates</Link>
          <br />
          <Link to="/jobs">Jobs</Link>
          <br />
          <br />
        </div>
        {routes.map(route => 
          <Route key={route.name} {...route} />
        )}
      </div>
    )
  }
}

export default App;
