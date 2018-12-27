import React from 'react'
import { toPairs } from 'lodash'

import { Paper, Grid, CircularProgress } from '@material-ui/core'
import { withStyles, WithStyles } from '@material-ui/core/styles'

import { JobTaskGroup } from '@shared/types'
import { Allocation } from '@shared/types'
import AllocationsApi from 'ui/jobs/containers/AllocationsApi'
import AllocationItem from '../AllocationItem'
import AllocationDetail from '../AllocationDetail'
import JobTaskGroupDetail from '../JobTaskGroupDetail'


type ScreenContent = 'taskGroup' | 'allocation'
const isAllocation = (entity: any): entity is Allocation => Boolean(entity.ID)
const isTaskGroup = (entity: any): entity is JobTaskGroup => Boolean(entity.Tasks)


const styles = () => ({
  groups: {
    padding: '8px',
    cursor: 'pointer'
  },
  allocationItem: {
    padding: '8px',
    cursor: 'pointer'
  }
})

type Props = {
  jobId: string
  taskGroups: JobTaskGroup[]
  allocations: Allocation[]
  selectedEntity?: Allocation | JobTaskGroup
  handleTaskGroupClick(taskGroup: JobTaskGroup): void
  handleAllocationClick(allocation: Allocation): void
  fetchingAllocs: boolean
}
const JobAllocations = withStyles(styles)(({ 
  taskGroups,
  allocations,
  selectedEntity, 
  fetchingAllocs, 
  handleAllocationClick, 
  handleTaskGroupClick, 
  classes 
}: Props & WithStyles<typeof styles>) => {
  if(fetchingAllocs) {
    return (
      <CircularProgress />
    )
  }

  const tgs = taskGroups.map(group => {
    const taskGroupAllocations = allocations.filter(a => a.TaskGroup === group.Name)
    return (
      <Grid item style={{width: '100%'}} key={group.Name}>
        <Paper className={classes.groups} onClick={() => handleTaskGroupClick(group)}>
          {group.Name}
          <br />
          <Grid container direction='column' spacing={8}>
            {taskGroupAllocations.map(allocation => (
              <Grid item key={allocation.ID}>
                <Paper 
                  className={classes.allocationItem}
                  onClick={(e) => {handleAllocationClick(allocation); e.stopPropagation()}}>
                  <AllocationItem allocation={allocation} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
      // <div>{name}<br />{taskGroupAllocations.map(a => <div><span>{a.ID}</span><br /></div>)}</div>
    )
  })

  return (
    <div>
      <Grid container spacing={40}>
        {/* left */}
        <Grid item container xs={4} spacing={8}>
          {tgs}
        </Grid>
        {/* right */}
        <Grid item xs={8}>
          <Paper>
            {selectedEntity && isAllocation(selectedEntity) && (
              <AllocationDetail allocation={selectedEntity} />
            )}
            {selectedEntity && isTaskGroup(selectedEntity) && (
              <JobTaskGroupDetail taskGroup={selectedEntity} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
})


type EnhanceProps = {
  jobId: string
  taskGroups: JobTaskGroup[]
}
type EnhanceState = {
  screenContent?: ScreenContent
  selectedEntity?: Allocation | JobTaskGroup
}
const enhance = (BaseComponent: React.ComponentType<Props>) => {
  class Enhance extends React.Component<EnhanceProps, EnhanceState> {
    // TODO: kterej content je zvolenej
    // TODO: allocations fetch
    state = {} as EnhanceState

    handleTaskGroupClick = (taskGroup: JobTaskGroup) => {
      this.setState({ screenContent: 'taskGroup', selectedEntity: taskGroup })
    }

    handleAllocationClick = (allocation: Allocation) => {
      this.setState({ screenContent: 'allocation', selectedEntity: allocation })
    }

    render() {
      return (
        <AllocationsApi jobId={this.props.jobId}>
          {({ allocationsApi: { allocations, fetching } }) => (
            <BaseComponent 
              jobId={this.props.jobId}
              taskGroups={this.props.taskGroups}
              allocations={allocations} 
              selectedEntity={this.state.selectedEntity}
              handleTaskGroupClick={this.handleTaskGroupClick}
              handleAllocationClick={this.handleAllocationClick}
              fetchingAllocs={fetching} />
          )}
        </AllocationsApi>
      )
    }
  }
  return Enhance
}

export default enhance(JobAllocations)