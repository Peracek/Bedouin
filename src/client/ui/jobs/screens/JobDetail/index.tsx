import React from 'react'

// import Job from '@shared/types/Job'
import JobApi from 'ui/jobs/containers/JobApi'
import Deployment from '@shared/types/Deployment'
import JobDeployment from './components/JobDeployment'


type Props = {
  fetching: boolean
  jobId: string
  deployments: Deployment[]
}
const JobDetail = ({ fetching, jobId, deployments }: Props) => {
  if(fetching) {
    return <span>fetching...</span>
  }
  const latestDeployment = deployments.sort((a, b) => b.JobVersion - a.JobVersion)[0]

  return (
    <div>
      <div>{jobId}</div>
      <br />
      <JobDeployment deployment={latestDeployment} />
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
      {({ jobApi }) => <JobDetail {...jobApi} jobId={id} />}
    </JobApi>
  )
}

export default JobDetailScreen

