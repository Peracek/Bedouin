import React from 'react'

import { 
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'

import { Allocation } from '@shared/types'


type Props = {
  allocations: Allocation[]
}
const AllocationsList = ({ allocations }: Props) => {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Id</TableCell>
            <TableCell>Modify index</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allocations.map(a => (
            <TableRow key={a.ID}>
              <TableCell>{a.Name}</TableCell>
              <TableCell>{a.ClientStatus}</TableCell>
              <TableCell>{a.ID}</TableCell>
              <TableCell>{a.ModifyIndex}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </div>
  )
}

export default AllocationsList