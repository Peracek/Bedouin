import { 
  Allocation,
  AllocationStats,
  Deployment,
  DeploymentTaskGroup,
  JobVersion,
  JobSummary,
  JobItem,
  Job,
  JobTaskGroup
} from '../../server/nomadClient/types'



type DeploymentJobVersion = Deployment & {
  JobVersionSpec: JobVersion
}

export {
  Allocation,
  AllocationStats,
  Deployment,
  DeploymentJobVersion,
  JobSummary,
  JobItem,
  Job,
  JobTaskGroup
}