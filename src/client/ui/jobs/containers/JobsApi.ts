import React from 'react'

import { JobItem } from '@shared/types'
import { jobsApi } from 'apiClient'


export type JobsApiBag = {
  jobs: JobItem[],
  fetching: boolean
}
type Props = {
  children: React.ComponentType<{ jobsApi: JobsApiBag }>
}
type State = {
  jobs: JobItem[]
  fetching: boolean
}
class JobsApi extends React.Component<Props, State> {
  state = {
    jobs: [],
    fetching: true
  } as State

  // FIXME: move this to separate and preferably more generic file
  ws = new WebSocket('ws://localhost:9000/api/jobs')

  componentDidMount() {
    jobsApi.fetch().then(jobs => {
      this.setState({ jobs, fetching: false })
    })

    this.ws.addEventListener('message', event => {
      const jobs = JSON.parse(event.data) as JobItem[]
      this.setState({ jobs })
    })
  }

  componentWillUnmount() {
    this.ws.close()
  }

  render() {
    const { children } = this.props
    const jobsApi = {
      ...this.state
    }
    return React.createElement(children, { jobsApi })
  }
}

export default JobsApi