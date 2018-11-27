import React from 'react'
import { FastField, FastFieldProps, getIn } from 'formik'

import MaterialTextField from '@material-ui/core/TextField'

type Props = {
  name: string
  label?: string
}
const TextField = ({ label, name }: Props) => {
  return (
    <FastField name={name} type="text">
      {({ field, form }: FastFieldProps) => {
        const error = getIn(form.errors, name)
        return (
          <MaterialTextField 
            {...field} 
            label={label} 
            error={Boolean(error)}
            helperText={error} />
        )
      }}
    </FastField>
  )
}

export default TextField