import { AppError } from '@common/Errors'
import * as types from '@types'

/**
 * validates matching brackets [[ ]]
 * maybe TODO: ensure brackets are always inside of quotes
 */
const validateBrackets = (template: types.Template['jobHCL']) => {
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
    throw new AppError('template brackets mismatch')
  }
}

export default validateBrackets
// const defer = fn => value => new Promise(resolve => resolve(fn(value)))
// export default defer(validateBrackets)
