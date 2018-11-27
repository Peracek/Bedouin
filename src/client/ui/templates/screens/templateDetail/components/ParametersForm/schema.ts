import yup from 'yup'
import { fromPairs } from 'lodash'

const parameterSchema = yup.object().shape({
  label: yup.string().max(50),
  // ... others
})

const createSchema = (fields: string[]) => {
  yup.object().shape(fromPairs(fields.map(f => [ f, parameterSchema ])))
}

export default createSchema