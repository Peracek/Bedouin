import React from 'react'
import { FastField, FastFieldProps, getIn } from 'formik'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'


type Props = {
  name: string
  label?: string
  onChange(event: React.ChangeEvent<any>): void
}

const FileField = ({ label, name, onChange }: Props) => {
  return (
    <FastField name={name}>
      {({ field, form }: FastFieldProps) => {
        const error = getIn(form.errors, name)
        return (
        <FormControl error={Boolean(error)}>
          <InputLabel>{label}</InputLabel>
          <Input  
            {...field}
            type="file"
            onChange={e => {
              onChange(e)
              field.onChange(e)
            }}
          />
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
      )}}
    </FastField>
  )
}

export default FileField