const routes = {
  job: (id: string) => `job/${id}`,
  jobs: `jobs`,
  jobsParse: `jobs/parse`,
  allocation: (id: string) => `allocation/${id}`,
  allocationLogs: (id: string) => `/client/fs/logs/${id}`,
  allocations: `allocations`,
  clientStats: `client/stats`,
}

export default routes