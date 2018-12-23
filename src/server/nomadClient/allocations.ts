import { Observable, timer } from 'rxjs'
import { flatMap } from 'rxjs/operators'

import logger from 'common/logger'
import { Allocation, AllocationStats } from './types'
import http, { observe, handleError } from './http'
import routes from './routes'


export const get = async (id: string) => {
  try {
    const { data } = await http.get<Allocation>(routes.allocation(id))
    return data 
  }
  catch(err) {
    throw handleError(err)
  }
}

export const getAll = () => {
  return http.get<Allocation[]>(routes.allocations)
}

export const getOfDeployment = async (deplId: string) => {
  try {
    const { data } = await http.get<Allocation[]>(routes.allocationsOfDeployment(deplId))
    return data
  } catch(err) {
    throw handleError(err)
  }
}

export const observeOfDeployment = (deplId: string) => {
  return observe<Allocation[]>(routes.allocationsOfDeployment(deplId))
}

export const observeLogs = (allocId: string) => {
  const observable = new Observable<string>(observer => {
    http.get(
      routes.allocationLogs(allocId), 
      { 
        responseType: 'stream',
        params: {
          task: 'example', //FIXME: need to pass task name here
          type: 'stdout',
          follow: true,
        }
      }
    )
      .then(response => {
        const stream = response.data
        stream.on('data', (chunk: ArrayBuffer) => {
          if(observer.closed) {
            stream.destroy()
          }

          try {
            const chunkObject = JSON.parse(chunk.toString())
            const rawData = chunkObject.Data
            if(rawData) {
              const data = Buffer.from(rawData, 'base64').toString()
              observer.next(data)
            }
          }
          catch(err) {
            logger.error(err)
            observer.error()
          }
        })
        stream.on('end', () => {
          observer.complete()
        })
      })
  })
  
  return observable
}

export const observeStats = (id: string) => {
  return timer(0, 4000)
    .pipe(
      flatMap(async () => {
        const { data } = await http.get<AllocationStats>(routes.allocationStats(id))
        return data
      })
    )
}