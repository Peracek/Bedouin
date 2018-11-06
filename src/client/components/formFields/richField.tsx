import * as React from 'react'
import { ErrorMessage } from 'formik'

const Label = (props: {
  htmlFor: string,
  label: string
}) => (
  <label htmlFor={props.htmlFor}>{props.label}</label>
)

const InputFeedback = (props: { for: string }) => (
  <ErrorMessage name={props.for} />
)

type FieldProps = { name: string }

type RichFieldProps = {
  label: string,
}
/**
 * Adds label and error message to a field
 */
 const richField = (FieldComponent: React.ComponentType<FieldProps & { [key: string]: any }>) => (props: FieldProps & RichFieldProps & { [key: string]: any }) => {
   const {
     label,
     ...otherProps
   } = props
   
   return (
    <div>
      <Label htmlFor={otherProps.name} label={label} />
      <FieldComponent {...otherProps} />
      <InputFeedback for={otherProps.name} />
    </div>
   )
 }

 export default richField