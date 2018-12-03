import axios from 'axios'
import { Observable, Observer } from 'rxjs'


const baseURL = 'http://localhost:4646/v1' // TODO: move to config

const http = axios.create({
  baseURL
})


const longPoll = async <T>(url: string, index: number) => {
  const response = await http.get<T>(url, {
    params: {
      index,
      wait: '10s'
    }
  })

  const { headers, data } = response
  const newIndex = +headers['x-nomad-index']

  return { index: newIndex, data }
}

const observe = <T>(url: string) => {
  const observable = new Observable((observer: Observer<T>) => {
    let lastIndex = 0
    const fn = async () => {
      while(!observer.closed) {
        const { index, data } = await longPoll<T>(url, lastIndex)
        if(lastIndex !== index) {
          observer.next(data)
        }
        lastIndex = index
      }
    }
    fn()
  })

  return observable
}

export { observe }
export default http