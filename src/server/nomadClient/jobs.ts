// import { Observable, Observer } from 'rxjs'

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
  let jobJSON: string
  const response = await http
    .post(
      routes.jobsParse, 
      { JobHCL: jobHCL },
      {
        responseType: 'json',
        transformResponse: res => res
      }
    )
  
  jobJSON = response.data
  return jobJSON
}


// const subscription = obs.subscribe({ next: val => console.log(val) })
// setTimeout(() => {subscription.unsubscribe(); console.log('unbsubscrigreot');}, 10000)
