import axios from 'axios'
import { Observable, Observer } from 'rxjs'

import Job from '@shared/types/Job'


const getJobs = (index: number) => {
  const query = index ? `?index=${index}&wait=5s` : ''
  return axios.get<Job[]>(`http://localhost:4646/v1/jobs${query}`)
    .then(response => {
      const { headers, data } = response
      const index = +headers['x-nomad-index']
      return { index, data }
    })
}


const obs = new Observable((observer: Observer<Job[]>) => {
  let lastIndex = 0
  const fn = async () => {
    while(!observer.closed) {
      const { index, data } = await getJobs(lastIndex)
      if(lastIndex !== index) {
        observer.next(data)
      }
      lastIndex = index
    }
  }
  fn()
})

export { obs }

// const subscription = obs.subscribe({ next: val => console.log(val) })

// setTimeout(() => {subscription.unsubscribe(); console.log('unbsubscrigreot');}, 10000)
