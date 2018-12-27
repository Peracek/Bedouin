import { Job, JobItem, JobSummary } from './types'
import http, { observe, handleError } from './http'
import routes from './routes'


export const get = (id: string) => {
  return http.get<Job>(routes.job(id))
}

export const observeOne = (jobId: string) => {
  return observe<Job>(routes.job(jobId))
}

export const getAll = async () => {
  try {
    const { data } = await http.get<JobItem[]>(routes.jobs)
    return data
  }
  catch(err) {
    throw handleError(err)
  }
}

export const observeAll = () => {
  return observe<JobItem[]>(routes.jobs)
}

export const observeSummary = (id: string) => {
  return observe<JobSummary>(routes.jobSummary(id))
}

/** parse HCL to JSON */
export const parse = async (jobHCL: string) => {
  try {
    const { data } = await http
      .post<{[key: string]: any}>(
        routes.jobParse, 
        { JobHCL: jobHCL },
        {
          responseType: 'json'
        }
      )
      return data
  } catch(err) {
    throw handleError(err)
  }
}

export const deploy = async (jobName: string, jobBody: object) => {
  const payload = { job: jobBody }

  try {
    await http.post(
      routes.jobDeploy(jobName),
      payload
    )
  } catch(err) {
    throw handleError(err)
  }
  return
}


// const subscription = obs.subscribe({ next: val => console.log(val) })
// setTimeout(() => {subscription.unsubscribe(); console.log('unbsubscrigreot');}, 10000)
