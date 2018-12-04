import React from 'react'

import Job from '@shared/types/Job'
import Allocation from '@shared/types/Allocation'
import { jobApi, JobApi as JobApiSchema } from 'apiClient'

type JobApiBag = State
type Props = {
  jobId: string
  children: React.ComponentType<{ jobApi: JobApiBag }>
}
type State = {
  fetching: boolean
  job?: Job
  allocations: Allocation[]
}
class JobApi extends React.Component<Props, State> {
  state = {
    fetching: true,
    allocations: []
  } as State

  jobApi: JobApiSchema = jobApi
  ws = new WebSocket(`ws://localhost:9000/api/allocations?job=${this.props.jobId}`)

  componentDidMount() {
    const { jobId } = this.props
    jobApi.fetch(jobId)
      .then(job => {
        this.setState({ job, fetching: false })
      })
    this.ws.addEventListener('message', event => {
      const allocations = JSON.parse(event.data) as Allocation[]
      this.setState({ allocations })
    })
  }

  render() {
    const { children } = this.props
    return React.createElement(children, { jobApi: this.state })
  }
}

export default JobApi