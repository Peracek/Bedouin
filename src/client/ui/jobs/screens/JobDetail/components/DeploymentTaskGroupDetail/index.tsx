import React from 'react'

import { DeploymentTaskGroup } from '@shared/types/Deployment'

type Props = {
  taskGroup: DeploymentTaskGroup
}
const DeploymentTaskGroupDetail = ({ taskGroup }: Props) => {
  return (
    <div>
      Hello, task group dontknow here, autoRevert is: {taskGroup.AutoRevert.toString()}
    </div>
  )
}

export default DeploymentTaskGroupDetail