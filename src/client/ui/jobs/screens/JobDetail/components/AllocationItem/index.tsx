import React from 'react'

import { Paper } from '@material-ui/core'

import Allocation from '@shared/types/Allocation'
import AllocationStatus from 'ui/jobs/components/AllocationStatus'

type Props = {
  allocation: Allocation
}
const AllocationItem = ({ allocation }: Props) => {
  return (
    <Paper>
      {allocation.ID}
      <br />
      {allocation.CreateTime}
      <br />
      <AllocationStatus status={allocation.ClientStatus as any} />
    </Paper>
  )
}

export default AllocationItem