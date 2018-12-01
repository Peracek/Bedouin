type Allocation = {
  ID: string
  Name: string
  JobsID: string
  ClientStatus: string //FIXME: 'running' | '...'
  CreateTime: number
  ModifyTime: number
}

export default Allocation