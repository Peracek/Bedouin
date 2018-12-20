type JobSummary = {
  ID: string
  Name: string
  type: string // FIXME: 'service | '...'
  Status: string // FIXME: 'pending' | '...' | '...'
  JobSummary: {
    Sumery: {
      Queued: number
      Complete: number
      Failed: number
      Running: number
      Starting: number
      Lost: number
    }
  }
}

export default JobSummary
