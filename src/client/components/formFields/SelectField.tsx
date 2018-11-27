import React from 'react'
import { FastField, FastFieldProps, getIn } from 'formik'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'


type Props = {
  name: string
  label?: string
  optionValues: { label: string, value: string }[]
}
const SelectField = ({ name, label, optionValues }: Props) => {
  return (
    <FastField name={name}>
      {({ field: { onChange, onBlur, name, value } }: FastFieldProps) => (
        <FormControl>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Select 
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            inputProps={{
              name,
              id: name
            }}>
            <MenuItem value="">None</MenuItem>
            {optionValues.map(({ label, value }) => (
              <MenuItem value={value}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )} 
    </FastField>
  )
}

export default SelectField