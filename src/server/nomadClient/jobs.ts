// import { Observable, Observer } from 'rxjs'
import { AxiosResponse } from 'axios'

import { log } from 'common/logger'
import { NomadError } from './NomadError'
import Job from './types/Job'
import http, { observe } from './http'
import routes from './routes'


export const get = (id: string) => {
  return http.get<Job>(routes.job(id))
}

export const getAll = () => {
  return http.get<Job[]>(routes.jobs)
}

export const observeAll = () => {
  return observe<Job[]>(routes.jobs)
}

/** parse HCL to JSON */
export const parse = async (jobHCL: string) => {
  let response: AxiosResponse<{[key: string]: any}>
  try {
    response = await http
      .post(
        routes.jobParse, 
        { JobHCL: jobHCL },
        {
          responseType: 'json'
        }
      )
  } catch(err) {
    if(err.response) {
      log('error', err.response.headers)
      log('error', err.response.data)
      throw new NomadError()
    }
    log('error', err)
    throw err
  }
  const job = response.data
  return job
}

export const deploy = async (jobName: string, jobBody: object) => {
  const payload = { job: jobBody }

  try {
    await http.post(
      routes.jobDeploy(jobName),
      payload
    )
  } catch(err) {
    if(err.response) {
      log('error', err.response.headers)
      log('error', err.response.data)
      throw new NomadError()
    }
    log('error', err)
    throw err
  }
  return
}


// const subscription = obs.subscribe({ next: val => console.log(val) })
// setTimeout(() => {subscription.unsubscribe(); console.log('unbsubscrigreot');}, 10000)
