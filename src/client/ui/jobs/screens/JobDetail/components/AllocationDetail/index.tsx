import React from 'react'
import { toPairs } from 'lodash'
import { Link } from 'react-router-dom';

import Allocation from '@shared/types/Allocation'
import AllocationStats from '@shared/types/AllocationStats'
import AllocationStatsApi from 'ui/jobs/containers/AllocationStatsApi'
import Logs from './Logs'


type Props = {
  allocation: Allocation
}
type EnhancedProps = {
  stats?: AllocationStats
}
const AllocationDetail = ({ allocation, stats }: Props & EnhancedProps) => {
  const taskStates = toPairs(allocation.TaskStates)
    .map(([taskName, task]) => (
      <div>
        Task: {taskName}
        <br />
        state: {task.State} | started at: {task.StartedAt}
        <br />
        {/* <Link to={'todo'}>Logs</Link> */}
        <Logs allocationId={allocation.ID} taskName={taskName} />
        <br />
        <br />
      </div>
    ))

  return (
    <div>
      Hello, allocation {allocation.ID} here
      <br />
      {stats && (
        <div>
          client: {allocation.NodeID}
          <br />
          {stats.ResourceUsage.CpuStats.Percent}
          <br />
          {stats.ResourceUsage.MemoryStats.Cache}
        </div>
      )}
      <br />
      <div>
        {taskStates}
      </div>
    </div>
  )
}


export default (props: Props) => (
  <AllocationStatsApi allocationId={props.allocation.ID}>
    {({ allocationStatsApi: { stats } }) => (
      <AllocationDetail {...props} stats={stats} />
    )}
  </AllocationStatsApi>
)