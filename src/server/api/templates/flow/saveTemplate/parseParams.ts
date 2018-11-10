import { TemplateParameter } from '@model/Template'
import { AppError } from '@common/Errors'


/**
 * validates matching brackets [[ ]]
 * maybe TODO: ensure brackets are always inside of quotes
 */
const validateBrackets = (template: string) => {
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

  return valid
}

const re = /\[\[ (\S*?) ]]/g
const parseParams = (job: string) => {
  const valid = validateBrackets(job)
  if(!valid) {
    throw new AppError('template brackets mismatch')
  }

  let words = new Set()
  let match: RegExpExecArray | null
  while(!!(match = re.exec(job))) {
    // TODO: check for keywords (not starting with '.' and mark them somehow)
    const word = match[1]
    words.add(word)
  }
  return [...words].map(word => ({ word }) as TemplateParameter)
}

export default parseParams

