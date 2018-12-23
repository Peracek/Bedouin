
type WhateverElse = { [key: string]: any }

type CpuStats = {
  Percent?: number
} & WhateverElse

type MemoryStats = {
  Cache?: number
} & WhateverElse

type ResourceUsage = {
  CpuStats: CpuStats
  MemoryStats: MemoryStats
}

type AllocationStats = {
  ResourceUsage: ResourceUsage
  Timestamp: Number
  Tasks: {
    [key: string]: {
      Pids: any
      ResourceUsage: ResourceUsage
      Timestamp: Number
    }
  }
}

export default AllocationStats