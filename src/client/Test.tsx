import * as React from 'react'

import ListProgress from "./ui/templates/components/ListProgress";
import * as processing from '@shared/types/ProcessingMessage'

export default (props: any) => 
  <ListProgress messages={[
    { event: processing.Event.NOMAD_PARSE, status: 'start' }
  ]} />