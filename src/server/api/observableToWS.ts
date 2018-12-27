import { Observable } from 'rxjs'
import * as ws from 'ws'


const observableToWS = (observable: Observable<any>, ws: ws) => {
  const subscription = observable.subscribe({
    next(data) {
      ws.send(JSON.stringify(data))
    },
    error() {
      ws.close(1011)
    },
    complete() {
      ws.close(1000)
    }
  })

  ws.on('close', () => {
    subscription.unsubscribe()
  })
}

export default observableToWS