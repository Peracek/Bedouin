import * as React from 'react'

import { ProcessingMessage } from '@shared/types'
import { ProcessingEventsNames } from '@shared/processingMessages'

type Props = {
  messages: ProcessingMessage[]
}
const ListProgress = ({
  messages
}: Props) => {
  const messageElements = messages
    .map(msg => ({ name: ProcessingEventsNames.get(msg.event), status: msg.status }))
    .map(msg => <div><span>{msg.name}</span><span>{msg.status}</span></div>)
  return (
    <div>
      {messageElements}
    </div>
  )
}

export default ListProgress