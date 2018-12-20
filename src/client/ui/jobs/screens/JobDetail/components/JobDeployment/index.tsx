import React from 'react'
import { toPairs } from 'lodash'

import Deployment from '@shared/types/Deployment'
import TaskGroups from 'ui/jobs/components/TaskGroups'


type Props = {
  deployment: Deployment
}
const JobDeployment = ({ deployment }: Props) => {
  const taskGroups = toPairs(deployment.TaskGroups)

  return (
    <div>
      {/* left */}
      <div>
        {/* <TaskGroups /> */}
        {taskGroups.map(tg => (
          <div>{JSON.stringify(tg)}</div>
        ))}
      </div>
      {/* right */}
      <div>
        {"content"}
      </div>
    </div>
  )
}


type EnhancerProps = {
  jobName: string
}
const withLastDeployment = (BaseComponent: React.ComponentType<Props>) => (props: EnhancerProps) => {

}

export default JobDeployment