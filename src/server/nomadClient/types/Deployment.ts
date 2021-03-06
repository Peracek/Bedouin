type TaskGroup = {
  AutoRevert: boolean
  DesiredCanaries: number
  DesiredTotal: number
  HealthyAllocs: number
  PlacedAllocs: number
  PlacedCanaries: string[]
  ProgressDeadline: number
  Promoted: boolean
  RequireProgressBy: Date
  UnhealthyAllocs: number
}

type Deployment = {
  ID: string
  JobID: string
  JobVersion: number
  Status: "running" | "failed" | "pending" 
  StatusDescription: string
  TaskGroups: { [key: string]: TaskGroup }
}

export { TaskGroup }
export default Deployment