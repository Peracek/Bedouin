

export type Template = {
  name: string,
  jobDescription: string
}


export type ProcessingMessage = {
  name: string,
  status: 'start' | 'end' | 'error'
  params?: {
    [key: string]: any
  }
}

