import * as React from 'react'
import { Link, Route } from 'react-router-dom'

import Jobs from './Jobs'
import Upload from './Upload'

const HelloWorld = () => <span>Hello world!</span>

const routes = [
  {
    path: '/',
    name: 'index',
    exact: true,
    component: HelloWorld
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
]

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to="jobs">Jobs</Link>
          <br />
          <Link to="upload">New job</Link>
        </div>
        {routes.map(route => 
          <Route key={route.name} {...route} />
        )}
      </div>
    )
  }
}

export default App;
