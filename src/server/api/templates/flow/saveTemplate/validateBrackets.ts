import { AppError } from '@common/Error'
import * as types from '@types'

class ValidationError extends Error {}

/**
 * validates matching brackets [[ ]]
 */
const validateBrackets = (template: types.Template['jobDescription']) => {
  let valid = true
  let insideDoubleBrackets = false

  for(let i = 0; i < template.length; i++) {
    if(template[i] === '[' && template[i+1] === '[') {
      if(insideDoubleBrackets) valid = false
      
      insideDoubleBrackets = true
      i = i + 1
    }

    if(template[i] === ']' && template[i+1] === ']') {
      if(!insideDoubleBrackets) valid = false

      insideDoubleBrackets = false
      i = i + 1
    }
  }

  if(insideDoubleBrackets) valid = false

  if(!valid) {
    throw new AppError('brackets_validation', 'Brackets mismatch')
  }
}

export default validateBrackets
// const defer = fn => value => new Promise(resolve => resolve(fn(value)))
// export default defer(validateBrackets)
