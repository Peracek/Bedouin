import React from 'react'

import JobApi from 'ui/jobs/containers/JobApi'
import JobAllocations from './components/JobAllocations'
import { Job, JobSummary, isBedouinMeta } from '@shared/types'


type Props = {
  jobSummary?: JobSummary
  jobSpec?: Job
}
const JobDetail = ({ jobSummary, jobSpec }: Props) => {
  if(!jobSummary || !jobSpec) {
    return <span>fetching...</span>
  }

  let templateInfo = <></>
  const { Meta } = jobSpec
  if(isBedouinMeta(Meta)) {
    templateInfo = (
      <div>{Meta._b_author}<br />{Meta._b_templateName}<br />{Meta._b_templateChecksum}<br />{Meta._b_templateParameters}</div>
    )
  }
  
  return (
    <div>
      <div>{jobSummary.JobID}</div>
      <br /><br />
      {templateInfo}
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

