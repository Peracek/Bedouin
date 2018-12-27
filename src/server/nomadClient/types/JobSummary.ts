type SummaryItem = {
  Complete: number
  Failed: number
  Lost: number
  Queued: number
  Running: number
  Starting: number
}

type JobSummary = {
  Children: {
    Dead: number
    Pending: number
    Running: number
  }
  CreateIndex: number
  JobID: string
  ModifyIndex: number
  Namespace: string
  Summary: {
    [ key: string ]: SummaryItem
  }
}

export default JobSummary