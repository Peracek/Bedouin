const routes = {
  job: (id: string) => `job/${id}`,
  jobSummary: (id: string) => `job/${id}/summary`,
  jobs: `jobs`,
  jobParse: `jobs/parse`,
  jobDeploy: (jobId: string) => `job/${jobId}`,
  allocation: (id: string) => `allocation/${id}`,
  allocationLogs: (id: string) => `client/fs/logs/${id}`,
  allocationStats: (id: string) => `/client/allocation/${id}/stats`,
  allocationsofJob: (jobId: string) => `job/${jobId}/allocations`,
  allocationsOfDeployment: (deplId: string) => `deployment/allocations/${deplId}`,
  deploymentsOfJob: (jobId: string) => `job/${jobId}/deployments`,
  versionsOfJob: (jobId: string) => `job/${jobId}/versions`,
  allocations: `allocations`,
  clientStats: `client/stats`,
}

export default routes