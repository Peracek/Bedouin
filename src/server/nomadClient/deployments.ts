import { Deployment } from './types'
import http, { observe as httpObserve, handleError } from './http'
import routes from './routes'


export const getAllOfJob = async (jobId: string) => {
  try {
    const { data } = await http.get<Deployment[]>(routes.deploymentsOfJob(jobId))
    return data
  } catch(err) {
    throw handleError(err)
  }
}

export const observeAllOfJob = (jobId: string) => {
  return httpObserve<Deployment[]>(routes.deploymentsOfJob(jobId))
}