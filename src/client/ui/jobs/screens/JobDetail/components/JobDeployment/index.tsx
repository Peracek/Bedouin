import React from 'react'
import { toPairs } from 'lodash'

import { Paper, Grid, CircularProgress } from '@material-ui/core'

import Deployment, { DeploymentTaskGroup } from '@shared/types/Deployment'
import Allocation from '@shared/types/Allocation'
import AllocationsApi from 'ui/jobs/containers/AllocationsApi'
import AllocationItem from '../AllocationItem'
import AllocationDetail from '../AllocationDetail'
import DeploymentTaskGroupDetail from '../DeploymentTaskGroupDetail'


type ScreenContent = 'taskGroup' | 'allocation'
const isAllocation = (entity: any): entity is Allocation => Boolean(entity.ID)
const isTaskGroup = (entity: any): entity is DeploymentTaskGroup => Boolean(entity.PlacedAllocs)

type Props = {
  deployment: Deployment
  allocations: Allocation[]
  selectedEntity?: Allocation | DeploymentTaskGroup
  handleTaskGroupClick(taskGroup: DeploymentTaskGroup): void
  handleAllocationClick(allocation: Allocation): void
  fetchingAllocs: boolean
}
const JobDeployment = ({ deployment, allocations, selectedEntity, fetchingAllocs, handleAllocationClick, handleTaskGroupClick }: Props) => {
  if(fetchingAllocs) {
    return (
      <CircularProgress />
    )
  }

  const taskGroups = toPairs(deployment.TaskGroups)
  const tgs = taskGroups.map(([name, taskGroup]) => {
    const taskGroupAllocations = allocations.filter(a => a.TaskGroup === name)
    return (
      <Paper onClick={() => handleTaskGroupClick(taskGroup)}>
        {name}
        <br />
        <div>
          {taskGroupAllocations.map(allocation => (
            <div onClick={(e) => {handleAllocationClick(allocation); e.stopPropagation()}}>
              <AllocationItem allocation={allocation} />
            </div>
          ))}
        </div>
      </Paper>
      // <div>{name}<br />{taskGroupAllocations.map(a => <div><span>{a.ID}</span><br /></div>)}</div>
    )
  })

  return (
    <div>
      <Grid container spacing={40}>
        {/* left */}
        <Grid item xs={4}>
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
}


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