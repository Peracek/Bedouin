import React from 'react'

import Deployment from '@shared/types/Deployment'
import { jobApi, JobApi as JobApiSchema } from 'apiClient'

type JobApiBag = State
type Props = {
  jobId: string
  children: React.ComponentType<{ jobApi: JobApiBag }>
}
type State = {
  fetching: boolean
  deployments: Deployment[]
}
class JobApi extends React.Component<Props, State> {
  state = {
    fetching: true,
    deployments: []
  } as State

  jobApi: JobApiSchema = jobApi
  // ws = new WebSocket(`ws://localhost:9000/api/allocations?job=${this.props.jobId}`)
  ws = new WebSocket(`ws://localhost:9000/api/jobs/${this.props.jobId}/deployments`)

  componentDidMount() {
    const { jobId } = this.props
    jobApi.fetchDeployments(jobId)
      .then(deployments => {
        this.setState({ deployments, fetching: false })
      })
    this.ws.addEventListener('message', event => {
      const deployments = JSON.parse(event.data) as Deployment[]
      this.setState({ deployments })
    })
    // this.ws.addEventListener('message', event => {
    //   const allocations = JSON.parse(event.data) as Allocation[]
    //   this.setState({ allocations })
    // })
  }

  componentWillUnmount() {
    this.ws.close()
  }

  render() {
    const { children } = this.props
    return React.createElement(children, { jobApi: this.state })
  }
}

export default JobApi