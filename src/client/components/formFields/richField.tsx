import * as React from 'react'
import { ErrorMessage } from 'formik'
import { omit } from 'lodash'

const Label = (props: {
  htmlFor: string,
  label: string
}) => (
  <label htmlFor={props.htmlFor}>{props.label}</label>
)

const InputFeedback = (props: { for: string }) => (
  <ErrorMessage name={props.for} />
)

type FieldProps = { 
  name: string 
}

type RichFieldProps = {
  label: string,
}
/**
 * Adds label and error message to a field
 */
 const richField = <ExtraProps extends {} = {}>(FieldComponent: React.ComponentType<FieldProps & ExtraProps>) => (props: FieldProps & RichFieldProps & ExtraProps) => {
  const label = props.label
  const otherProps = omit(props, 'label')
   
   return (
    <div>
      <Label htmlFor={otherProps.name} label={label} />
      <FieldComponent {...otherProps} />
      <InputFeedback for={otherProps.name} />
    </div>
   )
 }

 export default richField