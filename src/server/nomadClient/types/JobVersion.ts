type JobVersion = {
  ID: string
  JobID: string
  Version: number
} & {[key: string]: any} // all the rest properties

export default JobVersion
