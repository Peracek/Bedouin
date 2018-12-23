type Event = {
  Details?: object
  DiskLimit?: number
  DisplayMessage?: string
  DownloadError?: string
  DriverError?: string
  DriverMessage?: string
  ExitCode?: number
  FailedSibling?: string
  FailsTask?: boolean
  GenericSource?: string
  KillError?: string
  KillReason?: string
  KillTimeout?: number
  Message?: string
  RestartReason?: string
  SetupError?: string
  Signal?: number
  StartDelay?: number
  TaskSignal?: string
  TaskSignalReason?: string
  Time?: Number
  Type?: string
  ValidationError?: string
  VaultError?: string
}

type TaskState = {
  State: 'running' | 'dead'
  StartedAt: Date
  Restarts: number
  Failed: boolean
  Events: Event[]
}

type Allocation = {
  ID: string
  Name: string
  JobID: string
  NodeID: string
  ClientStatus: string //FIXME: 'running' | '...'
  CreateTime: number
  ModifyTime: number
  ModifyIndex: number
  TaskGroup: string
  TaskStates: {
    [key: string]: TaskState
  }
}

export default Allocation