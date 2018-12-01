import { Observable, Observer } from 'rxjs'

import Job from './types/Job'
import http from './http'
import routes from './routes'


export const get = (id: string) => {
  return http.get<Job>(routes.job(id))
}

export const getAll = () => {
  return http.get<Job[]>(routes.jobs)
}

const getChange = async (index: number) => {
  const response = await http.get<Job[]>(routes.jobs, {
    params: {
      index,
      wait: '10s'
    }
  })

  const { headers, data } = response
  const newIndex = +headers['x-nomad-index']

  return { index: newIndex, data }
}

export const getAllObservable = new Observable((observer: Observer<Job[]>) => {
  let lastIndex = 0
  const fn = async () => {
    while(!observer.closed) {
      const { index, data } = await getChange(lastIndex)
      if(lastIndex !== index) {
        observer.next(data)
      }
      lastIndex = index
    }
  }
  fn()
})

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
