import { trim, omitBy, isNil, mapValues, flow } from 'lodash/fp'

const trimAndNullifyIfString = (value: any) => {
  if(typeof value === 'string') {
    const str = trim(value)
    return str.length ? str : null
  }
  return value
}

const normalize = flow<any, any, any>(
  mapValues(trimAndNullifyIfString),
  omitBy(isNil)
)

export default normalize
