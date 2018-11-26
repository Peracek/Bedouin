import React from 'react'

import Job from '@shared/types/Job'
import JobApi from 'ui/jobs/containers/JobApi'


type Props = {
  fetching: boolean,
  job?: Job
}
const JobDetail = ({ fetching, job }: Props) => {
  if(fetching) {
    return <span>fetching...</span>
  }
  return (
    <div>
      {JSON.stringify(job!)}
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
      {({ jobApi: { fetching, job } }) => <JobDetail fetching={fetching} job={job} />}
    </JobApi>
  )
}

export default JobDetailScreen

