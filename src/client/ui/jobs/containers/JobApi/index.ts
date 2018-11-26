import React from 'react'

import Job from '@shared/types/Job'


type Props = {
  jobId: string
  children: React.ComponentType
}
type State = {
  fetching: boolean
  job: Job | null
}
class JobApi extends React.Component<Props, State> {
  state = {
    fetching: true,
    job: null
  } as State

  componentDidMount() {

  }

  render() {
    const { children } = this.props
    return React.createElement(children)
  }
}

export default JobApi