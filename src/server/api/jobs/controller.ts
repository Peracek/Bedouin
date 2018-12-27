import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators'

import { Deployment } from '@shared/types'
import * as nomad from 'nomadClient'

export const getJobs = () => {
  return nomad.jobs.getAll()
}

export const getDeployments = async (jobId: string): Promise<Deployment[]> => {
  const deploymentsPromise = nomad.deployments.getAllOfJob(jobId)
  const versionsPromise = nomad.versions.getAllOfJob(jobId)
  
  const [deployments, versions] = [await deploymentsPromise, await versionsPromise]

  return deployments.map(deploy => {
    const jobVersion = versions.find(v => v.Version === deploy.JobVersion)!
    return {
      ...deploy,
      JobVersionSpec: jobVersion
    }
  })
}

export const observeSpec = nomad.jobs.observeOne
export const observeSummary = nomad.jobs.observeSummary
export const observeAll = nomad.jobs.observeAll

export const observeDeployments = (jobId: string): Observable<Deployment[]> => {
  const deploymentsObservable = nomad.deployments
    .observeAllOfJob(jobId)
    .pipe(
      flatMap(async (deployments) => {
        const promiseMap = deployments.map(async deploy => {
          const versions = await nomad.versions.getAllOfJob(jobId)
          const jobVersion = versions.find(v => v.Version === deploy.JobVersion)!
          return {
            ...deploy,
            JobVersionSpec: jobVersion
          }
        })
        return await Promise.all(promiseMap)
      })
    )
  
    return deploymentsObservable
}