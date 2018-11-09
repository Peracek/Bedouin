import * as React from 'react'
import styled from 'styled-components'

import { ProcessingMessage } from '@shared/types'
import { ProcessingEventsNames } from '@shared/processingMessages'

type Props = {
  messages: ProcessingMessage[]
}


const ProgressItem = styled.div`
  color: green
  width: 300px
  & span:last-child {
    float: right
  }
`


const ListProgress = ({
  messages
}: Props) => {
  const messageElements = messages
    .map(msg => ({ name: ProcessingEventsNames.get(msg.event), status: msg.status }))
    .map(msg => <div><span>{msg.name}</span><span>{msg.status}</span></div>)
  return (
    <ProgressItem>
      {messageElements}
    </ProgressItem>
  )
}

export default ListProgress