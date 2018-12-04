import React from 'react'

import Job from '@shared/types/Job'
import JobApi from 'ui/jobs/containers/JobApi'
import Allocation from '@shared/types/Allocation'

import JobAllocations from './components/JobAllocations'


type Props = {
  fetching: boolean
  job?: Job
  allocations: Allocation[]
}
const JobDetail = ({ fetching, job, allocations }: Props) => {
  if(fetching) {
    return <span>fetching...</span>
  }
  return (
    <div>
      <div>{job!.Name}</div>
      <div>{job!.Status}</div>
      <JobAllocations allocations={allocations} />
    </div>
  )
}


type ScreenProps = {
  match: { url: string, params: { id: string } }
}
const JobDetailScreen = (props: ScreenProps) => {
  const { match: { params: { id } } } = props

  return (
    <JobApi jobId={id}>
      {({ jobApi }) => <JobDetail {...jobApi} />}
    </JobApi>
  )
}

export default JobDetailScreen

