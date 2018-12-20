import { Deployment, JobVersion } from '../../server/nomadClient/types'

type DeploymentWithJobVersion = Deployment & {
  JobVersionSpec: JobVersion
}

export default DeploymentWithJobVersion