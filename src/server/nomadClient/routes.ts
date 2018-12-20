const routes = {
  job: (id: string) => `job/${id}`,
  jobs: `jobs`,
  jobParse: `jobs/parse`,
  jobDeploy: (jobId: string) => `job/${jobId}`,
  allocation: (id: string) => `allocation/${id}`,
  allocationLogs: (id: string) => `client/fs/logs/${id}`,
  deploymentsOfJob: (jobId: string) => `job/${jobId}/deployments`,
  versionsOfJob: (jobId: string) => `job/${jobId}/versions`,
  allocations: `allocations`,
  clientStats: `client/stats`,
}

export default routes