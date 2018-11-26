import React from 'react'

import JobApi from 'ui/jobs/containers/JobApi'

const JobDetail = () => {
  return <span>TODO</span>
}

type ScreenProps = {
  match: { url: string, params: { id: string } }
}
const JobDetailScreen = (props: ScreenProps) => {
  const { match: { params: { id } } } = props

  return (
    <JobApi jobId={id}>
      {JobDetail}
    </JobApi>
  )
}



