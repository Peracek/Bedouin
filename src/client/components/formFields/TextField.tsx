import * as React from 'react'
import { FastField } from 'formik'

import richField from './richField'

const TextField = (props: TODO) => (
  <FastField
    name={props.name}
    component="input"
    type="text" />
)

export const RichTextField = richField(TextField)
export default TextField