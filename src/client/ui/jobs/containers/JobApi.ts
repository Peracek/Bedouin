import React from 'react'

import { jobApi } from 'apiClient'
import { JobSummary, Job } from '@shared/types'

type JobApiBag = State
type Props = {
  jobId: string
  children: React.ComponentType<{ jobApi: JobApiBag }>
}
type State = {
  jobSummary?: JobSummary
  jobSpec?: Job
}
class JobApi extends React.Component<Props, State> {
  state = {} as State
  jobSpecWS = jobApi.wsJobSpec(this.props.jobId)
  jobSummaryWS = jobApi.wsJobSummary(this.props.jobId)

  componentDidMount() {
    this.jobSpecWS.addEventListener('message', event => {
      const jobSpec = JSON.parse(event.data) as Job
      this.setState({ jobSpec })
    })

    this.jobSummaryWS.addEventListener('message', event => {
      const jobSummary = JSON.parse(event.data) as JobSummary
      this.setState({ jobSummary })
    })
  }

  componentWillUnmount() {
    this.jobSpecWS.close()
    this.jobSummaryWS.close()
  }

  render() {
    const { children } = this.props
    return React.createElement(children, { jobApi: this.state })
  }
}

export default JobApi