import React from 'react'

import { routes } from 'apiClient'

type State = {
  lastLogUpdate: Date
}
type AllocationTaskApiBag = {
  log: string
}
type Props = {
  allocationId: string
  taskName: string
  children: React.ComponentType<{ allocationTaskApi: AllocationTaskApiBag }>
}

class AllocationTaskApi extends React.Component<Props, State> {
  state = {} as State

  logChunks = [] as string[]
  ws = new WebSocket(`ws://localhost:9000/api/${routes.allocationTaskLogs(this.props.allocationId, this.props.taskName)}`)

  get log() {
    return this.logChunks.join('')
  }

  componentDidMount() {
    this.ws.addEventListener('message', event => {
      this.logChunks.push(event.data)
      this.setState({ lastLogUpdate: new Date() })
    })
  }

  componentWillUnmount() {
    this.ws.close()
  }

  render() {
    const { children } = this.props
    return React.createElement(children, { allocationTaskApi: { log: this.log } })
  }
}

export default AllocationTaskApi