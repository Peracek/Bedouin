import * as React from 'react'


const Label = (props: {
  htmlFor: string,
  label: string,
  // error?: string
}) => (
  <label htmlFor={props.htmlFor}>{props.label}</label>
)

const InputFeedback = (props: { error: string }) => (
  <span>{props.error}</span>
)

type FieldProps = { name: string }

type RichFieldProps = {
  label: string,
  error?: string
}
/**
 * Adds label and error message to a field
 */
 const richField = (FieldComponent: React.ComponentType<FieldProps>) => (props: FieldProps & RichFieldProps) => {
   const {
     label,
     error,
     ...otherProps
   } = props

   return (
    <div>
      <Label htmlFor={otherProps.name} label={label} />
      <FieldComponent {...otherProps} />
      {error && <InputFeedback error={error} />}
    </div>
   )
 }

 export default richField