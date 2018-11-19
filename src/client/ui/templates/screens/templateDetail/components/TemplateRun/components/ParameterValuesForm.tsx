import React from 'react'
import { Formik, FormikActions } from 'formik'
import { flow, map, fromPairs } from 'lodash/fp'

import { TemplateParameter } from "@shared/types/Template"
import { RichTextField } from '@components/formFields/TextField'



const initializeValues = (parameters: TemplateParameter[]) => {
  return flow(
    map<TemplateParameter, any>(p => ([p.word, p.defaultValue || '' ])),
    fromPairs
  )(parameters)
}

type Props = {
  parameters: TemplateParameter[],
  handleSubmit: (values: TODO) => Promise<TODO>
}
const ParameterValuesForm = ({ parameters, handleSubmit }: Props) => {
  parameters = parameters.map(p => ({
    ...p,
    word: p.word.replace('.',''),
  }))
  const initialValues = initializeValues(parameters)
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions: FormikActions<any>) => {
        handleSubmit(values).then(() => {
          actions.setSubmitting(false)
        })
      }}
      >
      {formProps => (
        <form onSubmit={formProps.handleSubmit}>
          {parameters.map(p =>
            <RichTextField key={p.word} name={p.word} label={p.label || p.word} />
          )}
        </form>
      )}
    </Formik>
  )
}

export default ParameterValuesForm