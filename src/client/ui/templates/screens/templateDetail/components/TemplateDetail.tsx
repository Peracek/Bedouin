import React from 'react'
import { Link } from 'react-router-dom'

import { Template, TemplateParameter } from '@shared/types/Template'
import ParametersForm from './ParametersForm'
import TemplateApi from '../../../containers/TemplateApi'

type Props = {
  template: Template,
  postParameters: ( parameters: TemplateParameter[] ) => any
}
const TemplateDetail = (props: Props) => {
  const { template } = props
  return (
    <div>
      <h2>{template.name}</h2>
      {template.parameters && <ParametersForm parameters={template.parameters} handleSubmit={props.postParameters} />}
      <button>Edit template params</button>
      <Link to={`${template.name}/run`}>Run job</Link>
      <button>Back to list</button>
    </div>
  )
}

export default TemplateDetail
