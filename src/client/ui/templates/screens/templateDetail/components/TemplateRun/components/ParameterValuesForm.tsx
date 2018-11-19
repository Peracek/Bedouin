import React from 'react'

import { TemplateParameter } from "@shared/types/Template"
import { RichTextField } from '@components/formFields/TextField'

type Props = {
  parameters: TemplateParameter[]
}
const ParameterValuesForm = ({ parameters }: Props) => {
  return (
    <form onSubmit={() => {}}>
      {parameters.map(p =>
        <RichTextField key={p.word} name={p.word} label={p.label || p.word} />
      )}
    </form>
  )
}

export default ParameterValuesForm