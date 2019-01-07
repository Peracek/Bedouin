import React from 'react'

import { AllocationStats } from '@shared/types'
import { routes, toWsUrl } from 'apiClient'

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

  ws = (() => {
    const url = toWsUrl(routes.allocationStats(this.props.allocationId))
    return new WebSocket(url)
  })()

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