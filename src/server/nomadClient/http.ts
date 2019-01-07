import axios, { AxiosError } from 'axios'
import { Observable, Observer } from 'rxjs'

import config from '../.././../config.json'
import { log } from 'common/logger'
import { NomadError } from './NomadError'


const baseURL = `${config.nomadUrl}v1`

const http = axios.create({
  baseURL
})

http.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log(config)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


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

const isServerError = (err: any): err is AxiosError => {
  return Boolean(err.response)
}

export const handleError = (err: any) => {
  log('error', err)
  if(isServerError(err)) {
    throw new NomadError(err)
  }
  throw err
}

export { observe }
export default http