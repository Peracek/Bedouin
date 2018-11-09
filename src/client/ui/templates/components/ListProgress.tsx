import * as React from 'react'
import styled from 'styled-components'

import ProcessingMessage, * as processing from '@shared/types/ProcessingMessage'

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
    .map(msg => ({ name: processing.EventNames.get(msg.event), status: msg.status }))
    .map(msg => <div><span>{msg.name}</span><span>{msg.status}</span></div>)
  return (
    <ProgressItem>
      {messageElements}
    </ProgressItem>
  )
}

export default ListProgress