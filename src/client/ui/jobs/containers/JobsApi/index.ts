import React from 'react'

import Job from '@shared/types/Job'
import { jobsApi } from 'apiClient'


export type JobsApiBag = {
  jobs: Job[],
  fetching: boolean
}
type Props = {
  children: React.ComponentType<{ jobsApi: JobsApiBag }>
}
type State = {
  jobs: Job[]
  fetching: boolean
}
class JobsApi extends React.Component<Props, State> {
  state = {
    jobs: [],
    fetching: true
  } as State

  componentDidMount() {
    jobsApi.fetch().then(jobs => {
      this.setState({ jobs, fetching: false })
    })
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