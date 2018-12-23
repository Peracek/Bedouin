import { Deployment, DeploymentTaskGroup, JobVersion } from '../../server/nomadClient/types'

type DeploymentWithJobVersion = Deployment & {
  JobVersionSpec: JobVersion
}

export { DeploymentTaskGroup }
export default DeploymentWithJobVersion