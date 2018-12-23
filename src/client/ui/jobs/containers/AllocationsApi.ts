import React from 'react'

import Allocation from '@shared/types/Allocation'
import { allocationsApi, AllocationsApi as AllocationsApiSchema, routes } from 'apiClient'


type State = {
  fetching: boolean
  allocations: Allocation[]
}
type AllocationsApiBag = State
type Props = {
  deplId: string
  children: React.ComponentType<{ allocationsApi: AllocationsApiBag }>
}

class AllocationsApi extends React.Component<Props, State> {
  state = {
    fetching: true,
    allocations: []
  } as State

  // TODO: try whather relative address works
  ws = new WebSocket(`ws://localhost:9000/api/${routes.allocations(this.props.deplId)}`)

  componentDidMount() {
    const { deplId } = this.props
    allocationsApi.fetchAllocations(deplId)
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