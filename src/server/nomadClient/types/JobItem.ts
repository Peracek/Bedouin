import { JobSummary } from '.'

type JobItem = {
  CreateIndex: number
  ID: number
  JobModifyIndex: number
  JobSummary: JobSummary
  ModifyIndex: number
  Name: string
  ParameterizedJob: boolean
  ParentID: number
  Periodic: boolean
  Priority: number
  Status: number
  StatusDescription: string
  Stop: true
  SubmitTime: number
  Type: 'service' | 'batch' | 'system'
}

export default JobItem
