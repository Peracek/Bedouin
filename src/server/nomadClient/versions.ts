import { JobVersion } from './types'
import http, { observe as httpObserve, handleError } from './http'
import routes from './routes'


export const getAllOfJob = async (jobId: string) => {
  try {
    const { data: { Versions } } = await http.get<{Versions: JobVersion[]}>(routes.versionsOfJob(jobId))
    return Versions
  } catch(err) {
    throw handleError(err)
  }
}

export const observeAllOfJob = (jobId: string) => {
  return httpObserve<JobVersion[]>(routes.versionsOfJob(jobId))
}