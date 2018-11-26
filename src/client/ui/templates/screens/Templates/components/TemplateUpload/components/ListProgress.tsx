import React from 'react'

import ProcessingMessage, * as processing from '@shared/types/ProcessingMessage'
import WebsocketListener from 'ui/templates/containers/WebsocketListener'

type Props = {
  messages: ProcessingMessage[]
}

export const ListProgress = ({
  messages
}: Props) => {
  const messageElements = messages
    .map(msg => ({ name: processing.EventNames.get(msg.event), status: msg.status }))
    .map(msg => <div><span>{msg.name}</span><span>{msg.status}</span></div>)
  return (
    <div>
      {messageElements}
    </div>
  )
}



export default (props: { 
  targetUrl: string, 
  onMessage?: (message: ProcessingMessage) => void, 
  onClose?: (code: number) => void 
}) => (
  <WebsocketListener<ProcessingMessage> {...props}>
    {ListProgress}
  </WebsocketListener>
)