import * as React from 'react'

import { Template } from '@shared/types/Template'
import ParametersForm from './ParametersForm'
import { postParameters } from '../apiClient'

type Props = {
  template: Template
}
const TemplateDetail = ({ template }: Props) => {
  return (
    <div>
      <h2>{template.name}</h2>
      {template.parameters && <ParametersForm parameters={template.parameters} handleSubmit={(values: TODO) => postParameters(values, template.name)} />}
      <button>Edit template params</button>
      <button>Deploy</button>
      <button>Back to list</button>
    </div>
  )
}

export default TemplateDetail
