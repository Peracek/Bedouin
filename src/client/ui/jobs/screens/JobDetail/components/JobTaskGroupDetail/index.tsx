import React from 'react'

import { JobTaskGroup } from '@shared/types'

type Props = {
  taskGroup: JobTaskGroup
}
const JobTaskGroupDetail = ({ taskGroup }: Props) => {
  return (
    <div>
      Hello, task group {taskGroup.Name} here, count is: {taskGroup.Count}
    </div>
  )
}

export default JobTaskGroupDetail