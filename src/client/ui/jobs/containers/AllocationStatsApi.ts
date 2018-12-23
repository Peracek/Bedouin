import React from 'react'

import AllocationStats from '@shared/types/AllocationStats'
import { routes } from 'apiClient'

type State = {
  stats?: AllocationStats
}
type AllocationStatsApiBag = State
type Props = {
  allocationId: string
  children: React.ComponentType<{ allocationStatsApi: AllocationStatsApiBag }>
}

class AllocationStatsApi extends React.Component<Props, State> {
  state = {} as State

  ws = new WebSocket(`ws://localhost:9000/api/${routes.allocationStats(this.props.allocationId)}`)

  componentDidMount() {
    this.ws.addEventListener('message', event => {
      const stats = JSON.parse(event.data) as AllocationStats
      this.setState({ stats })
    })
  }

  componentWillUnmount() {
    this.ws.close()
  }

  render() {
    const { children } = this.props
    return React.createElement(children, { allocationStatsApi: this.state })
  }
}

export default AllocationStatsApi