import { Stats } from './types/client'
import http from './http'
import routes from './routes'


export const getStats = () => {
  return http.get<Stats>(routes.clientStats)
}
