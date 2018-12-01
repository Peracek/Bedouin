import { Observable } from 'rxjs'

import logger from 'common/logger'
import Allocation from './types/Allocation'
import http from './http'
import routes from './routes'


export const get = (id: string) => {
  return http.get<Allocation>(routes.allocation(id))
}

export const getAll = () => {
  return http.get<Allocation[]>(routes.allocations)
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
