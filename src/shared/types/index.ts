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

type BedouinMeta = {
  _b_author: string
  _b_templateName: string
  _b_templateChecksum: string
  _b_templateParameters: string
}
const isBedouinMeta = (obj: { [key: string]: string }): obj is BedouinMeta => {
  return Boolean(obj.templateName)
}

export {
  Allocation,
  AllocationStats,
  Deployment,
  DeploymentJobVersion,
  JobSummary,
  JobItem,
  Job,
  JobTaskGroup,
  BedouinMeta,
  isBedouinMeta
}