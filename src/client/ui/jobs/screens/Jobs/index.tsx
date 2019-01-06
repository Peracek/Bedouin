import React from 'react'
import { Link } from 'react-router-dom'

import { CircularProgress } from '@material-ui/core'

import BreadcrumbsToolbar from 'components/BreadcrumbsToolbar'
import JobsApi, { JobsApiBag } from '../../containers/JobsApi'


type Props = JobsApiBag
const Jobs = ({ fetching, jobs }: Props) => {
  if(fetching) {
    return <CircularProgress />
  }

  return (
    <div>
      <BreadcrumbsToolbar />
      {jobs.map(job => (
        <div key={job.ID}><Link to={`/jobs/${job.ID}`}>{job.Name}</Link><span>{job.Status}</span></div>
      ))}
    </div>
  )
}

const JobsScreen = () => (
  <JobsApi>
    {({ jobsApi: { jobs, fetching } }) => (
      <Jobs jobs={jobs} fetching={fetching} />
    )}
  </JobsApi>
)

export default JobsScreen