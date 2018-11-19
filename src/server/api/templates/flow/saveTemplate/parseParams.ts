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

  let words = new Set<string>()
  let match: RegExpExecArray | null
  while(!!(match = re.exec(job))) {
    const word = match[1]
    words.add(word)
  }
  return [...words].map(word => {
    const internal = word[0] !== '.'
    return {
      word: internal ? word : word.substr(1)
    } as TemplateParameter
  })
}

export default parseParams

