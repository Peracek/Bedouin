const routes = {
  job: (id: string) => `job/${id}`,
  jobs: `jobs`,
  jobParse: `jobs/parse`,
  jobDeploy: (jobName: string) => `job/${jobName}`,
  allocation: (id: string) => `allocation/${id}`,
  allocationLogs: (id: string) => `/client/fs/logs/${id}`,
  allocations: `allocations`,
  clientStats: `client/stats`,
}

export default routes