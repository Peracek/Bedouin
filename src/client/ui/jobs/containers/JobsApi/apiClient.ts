import axios from 'axios'

import Job from '@shared/types/Job'

export const getJobs = () => {
  return axios.get('/api/jobs')
    .then(({ data }) => data as Job[])
}

