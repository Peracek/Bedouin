import React from 'react'
import { toPairs } from 'lodash'

import { Paper, Grid, CircularProgress } from '@material-ui/core'
import { withStyles, WithStyles } from '@material-ui/core/styles'

import Deployment, { DeploymentTaskGroup } from '@shared/types/Deployment'
import Allocation from '@shared/types/Allocation'
import AllocationsApi from 'ui/jobs/containers/AllocationsApi'
import AllocationItem from '../AllocationItem'
import AllocationDetail from '../AllocationDetail'
import DeploymentTaskGroupDetail from '../DeploymentTaskGroupDetail'


type ScreenContent = 'taskGroup' | 'allocation'
const isAllocation = (entity: any): entity is Allocation => Boolean(entity.ID)
const isTaskGroup = (entity: any): entity is DeploymentTaskGroup => Boolean(entity.PlacedAllocs)


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
  deployment: Deployment
  allocations: Allocation[]
  selectedEntity?: Allocation | DeploymentTaskGroup
  handleTaskGroupClick(taskGroup: DeploymentTaskGroup): void
  handleAllocationClick(allocation: Allocation): void
  fetchingAllocs: boolean
}
const JobDeployment = withStyles(styles)(({ 
  deployment, 
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

  const taskGroups = toPairs(deployment.TaskGroups)
  const tgs = taskGroups.map(([name, taskGroup]) => {
    const taskGroupAllocations = allocations.filter(a => a.TaskGroup === name)
    return (
      <Grid item style={{width: '100%'}}>
        <Paper className={classes.groups} onClick={() => handleTaskGroupClick(taskGroup)}>
          {name}
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
              <DeploymentTaskGroupDetail taskGroup={selectedEntity} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
})


type EnhanceProps = {
  deployment: Deployment
}
type EnhanceState = {
  screenContent?: ScreenContent
  selectedEntity?: Allocation | DeploymentTaskGroup
}
const enhance = (BaseComponent: React.ComponentType<Props>) => {
  class Enhance extends React.Component<EnhanceProps, EnhanceState> {
    // TODO: kterej content je zvolenej
    // TODO: allocations fetch
    state = {} as EnhanceState

    handleTaskGroupClick = (taskGroup: DeploymentTaskGroup) => {
      this.setState({ screenContent: 'taskGroup', selectedEntity: taskGroup })
    }

    handleAllocationClick = (allocation: Allocation) => {
      this.setState({ screenContent: 'allocation', selectedEntity: allocation })
    }

    render() {
      return (
        <AllocationsApi deplId={this.props.deployment.ID}>
          {({ allocationsApi: { allocations, fetching } }) => (
            <BaseComponent 
              deployment={this.props.deployment}
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

export default enhance(JobDeployment)