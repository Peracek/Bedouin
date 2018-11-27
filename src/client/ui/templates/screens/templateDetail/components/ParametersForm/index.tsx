import React from 'react'
import { Formik, FormikActions } from 'formik'

import { TemplateParameter } from '@shared/types/Template'
import TextField from '@components/formFields/TextField'
import createSchema from './schema'

const ParameterFields = ({ index }: { index: number }) => {
  return (
    <>
      <TextField label="label" name={`p.[${index}].label`} />
      <TextField label="description" name={`p.[${index}].description`} />
      <TextField label="type" name={`p.[${index}].type`} />
      <TextField label="regex to match" name={`p.[${index}].match`} />
      <TextField label="default value" name={`p.[${index}].defaultValue`} />
    </>
  )
}

const initializeEmptyProps = (parameter: TemplateParameter) => ({
  label: '',
  description: '',
  type: '',
  match: '',
  defaultValue: '',
  ...parameter
})


const renderFields = (parameters: Props['parameters']) => {
  return parameters.map((parameter, index) => (
    <div key={parameter.word}>
      <h3>{parameter.label || parameter.word}</h3>
      <ParameterFields index={index} />
    </div>
  ))
}

type Props = {
  parameters: TemplateParameter[],
  // initialValues: TODO,
  handleSubmit: TODO
}
const Form = ({ parameters, handleSubmit }: Props) => {
  const initialValues = {
    p: parameters.map(p => initializeEmptyProps(p))
  }
  const schema = createSchema(parameters.map(({ word }) => word)) // FIXME: toto nebude sedet na formik fieldy name

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions: FormikActions<any>) => {
        const isOk = handleSubmit(values.p)
        if(isOk) {
          actions.setSubmitting(false)
        }
      }}
    >
      {formProps => (
        <form onSubmit={formProps.handleSubmit}>
          {renderFields(parameters)}
          <button type="submit">save</button>
        </form>
      )}
    </Formik>
  )
}

 export default Form