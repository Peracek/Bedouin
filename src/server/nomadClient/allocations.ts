import { Observable } from 'rxjs'
import { distinctUntilChanged, map } from 'rxjs/operators'

import logger from 'common/logger'
import Allocation from './types/Allocation'
import http, { observe } from './http'
import routes from './routes'


export const get = (id: string) => {
  return http.get<Allocation>(routes.allocation(id))
}

export const getAll = () => {
  return http.get<Allocation[]>(routes.allocations)
}

export const getOfJob = async (jobId: string) => {
  const { data } = await getAll()
  return data.filter(job => job.JobID === jobId)
}

/** calculates sum of modify indices of allocations in array */
const modifyIndex = (allocs: Allocation[]) => allocs.reduce((acc, alloc) => acc += alloc.ModifyIndex, 0)
export const observeOfJob = (jobId: string) => {
  return observe<Allocation[]>(routes.allocations)
    .pipe(
      map(allocs => allocs.filter(alloc => {console.log(alloc.JobID, jobId); return alloc.JobID === jobId})),
      distinctUntilChanged((allocsX, allocsY) => {
        return modifyIndex(allocsX) === modifyIndex(allocsY)
      })
    )
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
