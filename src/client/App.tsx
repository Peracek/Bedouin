import * as React from 'react'
import { Link, Route } from 'react-router-dom'

import Jobs from './Jobs'
import Test from './Test'
import Upload from './ui/templates/screens/Upload'
import Detail from './ui/templates/screens/TemplateDetail'


const routes = [
  {
    path: '/',
    name: 'index',
    exact: true,
    component: Test
  },
  {
    path: '/upload',
    name: 'upload',
    exact: true,
    component: Upload,
  },
  {
    path: '/jobs',
    name: 'jobs',
    exact: true,
    component: Jobs,
  },
  {
    path: '/detail/:name',
    name: 'defail',
    exact: true,
    component: Detail
  }
]

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/jobs">Jobs</Link>
          <br />
          <Link to="/upload">New job</Link>
        </div>
        {routes.map(route => 
          <Route key={route.name} {...route} />
        )}
      </div>
    )
  }
}

export default App;
