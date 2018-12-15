import { toPairs } from 'lodash'

import { readFileSync } from './fileBrowser'

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


class TemplateDefinition {

  templatePath: string
  paramsPath?: string

  constructor(templatePath: string, paramsPath?: string) {
    //TODO: validate here?

    this.templatePath = templatePath
    this.paramsPath = paramsPath
  }

  validate() {
    let valid = validateBrackets(this.templateSpec)
    // TODO: validate params and params with templates together
    return valid
  }

  get templateSpec() {
    return readFileSync(this.templatePath)
  }

  get paramsSpec() {
    if(!this.templatePath) return
    return readFileSync(this.templatePath)
  }

  render(paramValues: { [key: string]: any }) {
    let jobSpec = this.templateSpec

    toPairs(paramValues)
      .map(([ key, value ]) => {
        const re = new RegExp(`\\[\\[ ${key} \\]\\]`, 'g')
        jobSpec = jobSpec.replace(re, value)
      })
  }

}

export default TemplateDefinition