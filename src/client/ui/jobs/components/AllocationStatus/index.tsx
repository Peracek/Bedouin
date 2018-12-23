import React from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'

const StatusColors = new Map<Status, string>([
  ['pending', '#dbdbdb'],
  ['running', '#25ba81'],
  ['complete', '#1d9467'],
])
const styles = () =>
  createStyles({
    root: {
    },
    statColor: {
      display: 'inline-block',
      width: '1rem',
      height: '1rem',
      marginRight: '8px',
      verticalAlign: 'middle',
      borderRadius: '2px'
    }
  })

type Status = 'pending' | 'running' | 'complete'
type Props = {
  status: Status
}
const AllocationStatus = withStyles(styles)(({ status, classes }: Props & WithStyles<typeof styles>) => {
  return (
    <div className={classes.root }>
      <span className={classes.statColor} style={{ background: StatusColors.get(status) }} />
      <span>{status}</span>
    </div>
  )
})

export default AllocationStatus