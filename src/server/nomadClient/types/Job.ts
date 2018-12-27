export type Task = {
  Name: string
  Driver: string
}

export type TaskGroup = {
  Name: string
  Count: number
  Tasks: Task[]
}

type Job = {
  ID: string
  Name: string
  Type: 'service' | 'batch' | 'system'
  TaskGroups: TaskGroup[]
  Meta: { [key: string]: string }
} & { [key: string]: any }

export default Job