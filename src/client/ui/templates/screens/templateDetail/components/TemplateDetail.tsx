import * as React from 'react'
import { createComposer } from 'recompost'

import { Template, TemplateParameter } from '@shared/types/Template'
import ParametersForm from './ParametersForm'
import templateApi from '../../../containers/templateApi'

type Props = {
  template?: Template,
  fetching: boolean,
  postParameters: ( parameters: TemplateParameter[] ) => void
}
const TemplateDetail = (props: Props) => {
  if(props.fetching) {
    return <div>Spinner...</div>
  }

  const template = props.template!
  return (
    <div>
      <h2>{template.name}</h2>
      {template.parameters && <ParametersForm parameters={template.parameters} handleSubmit={props.postParameters} />}
      <button>Edit template params</button>
      <button>Deploy</button>
      <button>Back to list</button>
    </div>
  )
}

const enhance = createComposer<{templateName: string}>()
  .withDecorator(templateApi)
  .build()

export default enhance(TemplateDetail)