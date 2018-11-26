import React from 'react'
import { Link } from 'react-router-dom'

import JobsApi, { JobsApiBag } from '../../containers/JobsApi'


type Props = JobsApiBag
const Jobs = ({ fetching, jobs }: Props) => {
  if(fetching) {
    return <span>spinna</span>
  }

  return <div>{jobs.map(job => (
    <div key={job.ID}><Link to={`/jobs/${job.ID}`}>{job.Name}</Link></div>
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