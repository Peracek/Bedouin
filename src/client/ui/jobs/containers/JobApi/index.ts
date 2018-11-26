import React from 'react'

import Job from '@shared/types/Job'
import { jobApi, JobApi as JobApiSchema } from 'apiClient'

type JobApiBag = State
type Props = {
  jobId: string
  children: React.ComponentType<{ jobApi: JobApiBag }>
}
type State = {
  fetching: boolean
  job?: Job
}
class JobApi extends React.Component<Props, State> {
  state = {
    fetching: true
  } as State

  jobApi: JobApiSchema = jobApi

  async componentDidMount() {
    const { jobId } = this.props
    const job = await jobApi.fetch(jobId)
    this.setState({ job, fetching: false })
  }

  render() {
    const { children } = this.props
    return React.createElement(children, { jobApi: this.state })
  }
}

export default JobApi