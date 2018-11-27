import React from 'react'
import { Formik, FormikActions, FieldArray } from 'formik'

import { TemplateParameter } from '@shared/types/Template'
import { parametersSchema as schema } from '@shared/schemas/templates'
import TextField from '@components/formFields/TextField'
import SelectField from '@components/formFields/SelectField'


const typeOptionValues = [
  { label: 'String', value: 'string' },
  { label: 'Boolean', value: 'boolean' }
]

const ParameterFields = ({ index }: { index: number }) => {
  return (
    <>
      <TextField label="Label" name={`parameters[${index}].label`} />
      <TextField label="Description" name={`parameters[${index}].description`} />
      <SelectField label="Type" name={`parameters[${index}].type`} optionValues={typeOptionValues} />
      <TextField label="Regex to match" name={`parameters[${index}].match`} />
      <TextField label="Default value" name={`parameters[${index}].defaultValue`} />
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
  return (
    <FieldArray name="parameters">
      {arrayHelpers => (
        parameters.map((parameter, index) => (
          <div key={parameter.word}>
            <h3>{parameter.label || parameter.word}</h3>
            <ParameterFields index={index} />
          </div>
        ))
      )}
    </FieldArray>
  )
}

type Props = {
  parameters: TemplateParameter[],
  // initialValues: TODO,
  handleSubmit: TODO
}
const Form = ({ parameters, handleSubmit }: Props) => {
  const initialValues = {
    parameters: parameters.map(p => initializeEmptyProps(p))
  }
  // const schema = createSchema(parameters.map(({ word }) => word)) // FIXME: toto nebude sedet na formik fieldy name

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, actions: FormikActions<any>) => {
        const isOk = handleSubmit(values.parameters)
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