import React from 'react'

import { Allocation } from '@shared/types'
import { allocationsApi } from 'apiClient'


type State = {
  fetching: boolean
  allocations: Allocation[]
}
type AllocationsApiBag = State
type Props = {
  jobId: string
  children: React.ComponentType<{ allocationsApi: AllocationsApiBag }>
}

class AllocationsApi extends React.Component<Props, State> {
  state = {
    fetching: true,
    allocations: []
  } as State
  ws = allocationsApi.wsJobAllocations(this.props.jobId)

  componentDidMount() {
    const { jobId } = this.props
    allocationsApi.fetchJobAllocations(jobId)
    .then(allocations => {
      this.setState({ allocations, fetching: false })
    })
    this.ws.addEventListener('message', event => {
      const allocations = JSON.parse(event.data) as Allocation[]
      this.setState({ allocations })
    })
  }

  componentWillUnmount() {
    this.ws.close()
  }

  render() {
    const { children } = this.props
    return React.createElement(children, { allocationsApi: this.state })
  }
}

export default AllocationsApi