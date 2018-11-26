import React from 'react'

import JobsApi, { JobsApiBag } from '../../containers/JobsApi'


type Props = JobsApiBag
const Jobs = ({ fetching, jobs }: Props) => {
  if(fetching) {
    return <span>spinna</span>
  }

  return <div>{jobs.map(job => (
    <div key={job.ID}>{job.Name}</div>
  ))}</div>
}

const JobsScreen = () => (
  <JobsApi>
    {({ jobsApi: { jobs, fetching } }) => (
      <Jobs jobs={jobs} fetching={fetching} />
    )}
  </JobsApi>
)

export default JobsScreen