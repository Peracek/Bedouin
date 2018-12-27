import React from 'react'

// import Job from '@shared/types/Job'
import JobApi from 'ui/jobs/containers/JobApi'
import JobAllocations from './components/JobAllocations'
import { Job, JobSummary } from '@shared/types'


type Props = {
  jobSummary?: JobSummary
  jobSpec?: Job
}
const JobDetail = ({ jobSummary, jobSpec }: Props) => {
  if(!jobSummary || !jobSpec) {
    return <span>fetching...</span>
  }
  
  return (
    <div>
      <div>{jobSummary.JobID}</div>
      <br /><br />
      TODO: template summary
      <br /><br />
      <JobAllocations jobId={jobSummary.JobID} taskGroups={jobSpec.TaskGroups} />
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

