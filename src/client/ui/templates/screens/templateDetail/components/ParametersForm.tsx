import React from 'react'
import { Formik, FormikActions, FastField } from 'formik'

import { TemplateParameter } from '@shared/types/Template'
import { RichTextField } from '@components/formFields/TextField'


const ParameterFields = ({ index }: { index: number }) => {
  return (
    <>
      <RichTextField label="label" name={`p.[${index}].label`} />
      <RichTextField label="description" name={`p.[${index}].description`} />
      <RichTextField label="type" name={`p.[${index}].type`} />
      <RichTextField label="regex to match" name={`p.[${index}].match`} />
      <RichTextField label="default value" name={`p.[${index}].defaultValue`} />
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
const Form = (props: Props) => {
  const initialValues = {
    p: props.parameters.map(p => initializeEmptyProps(p))
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions: FormikActions<any>) => {
        const isOk = props.handleSubmit(values.p)
        if(isOk) {
          actions.setSubmitting(false)
        }
      }}
    >
      {formProps => (
        <form onSubmit={formProps.handleSubmit}>
          {renderFields(props.parameters)}
          <button type="submit">save</button>
        </form>
      )}
    </Formik>
  )
}

 export default Form