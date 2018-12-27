import React from 'react'

import { Allocation } from '@shared/types'
import AllocationStatus from 'ui/jobs/components/AllocationStatus'

type Props = {
  allocation: Allocation
}
const AllocationItem = ({ allocation }: Props) => {
  return (
    <div>
      {allocation.ID}
      <br />
      {allocation.CreateTime}
      <br />
      <AllocationStatus status={allocation.ClientStatus as any} />
    </div>
  )
}

export default AllocationItem