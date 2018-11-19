import React from 'react'

import { Template } from '@shared/types/Template'
import ParameterValuesForm from './components/ParameterValuesForm'

type Props = {
  template: Template
  handleRun: (parameterValues: TODO) => Promise<TODO>
}
const TemplateRun = ({ template }: Props) => {
  let parameters = (() => {
    if(template.parameters) {
      return <ParameterValuesForm parameters={template.parameters} handleSubmit={() => Promise.resolve('hahandle')} />
    }
    return <span>all set!</span>
  })()

  return (
    <div>
      <h2>Run it</h2>
      {parameters}
    </div>
  )
}

export default TemplateRun