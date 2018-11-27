import React from 'react'
import { FastField, FastFieldProps} from 'formik'

import MaterialTextField from '@material-ui/core/TextField'

type Props = {
  name: string
  label?: string
}
const TextField = ({ label, name }: Props) => {
  return (
    <FastField name={name} type="text">
      {({ field }: FastFieldProps) => (
        <MaterialTextField {...field} label={label} />
      )}
    </FastField>
  )
}

export default TextField