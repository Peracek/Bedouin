type Allocation = {
  ID: string
  Name: string
  JobID: string
  ClientStatus: string //FIXME: 'running' | '...'
  CreateTime: number
  ModifyTime: number
  ModifyIndex: number
}

export default Allocation