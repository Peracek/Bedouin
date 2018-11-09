import * as React from 'react'

import ListProgress from "./ui/templates/components/ListProgress";
import { ProcessingEvent } from '@shared/processingMessages'

export default (props: any) => 
  <ListProgress messages={[
    { event: ProcessingEvent.BRACKET_VALIDATION, status: 'start' }
  ]} />