import * as React from 'react'
import { Field } from 'formik'

import richField from './richField'

const TextField = (props: TODO) => (
  <Field
    name={props.name}
    component="input"
    type="text" />
)

export const RichTextField = richField(TextField)
export default TextField