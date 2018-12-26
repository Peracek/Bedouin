import React from 'react'

import AllocationTaskApi from 'ui/jobs/containers/AllocationTaskApi'


type Props = {
  allocationId: string
  taskName: string
}
type EnhancedProps = {
  log: string
}
const Logs = ({ log }: Props & EnhancedProps) => {

  return (
    <div>
      {log}
    </div>
  )
}


export default (props: Props) => (
  <AllocationTaskApi allocationId={props.allocationId} taskName={props.taskName}>
    {({ allocationTaskApi: { log } }) => (
      <Logs {...props} log={log} />
    )}
  </AllocationTaskApi>
)