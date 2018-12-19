import { join } from 'path'
import { flow, map, fromPairs } from 'lodash/fp'

import { log } from 'common/logger'
import { parseConfig, renderTemplate } from 'template-utils'
import { readFileSync } from './fileBrowser'

export type ParameterSpec = {
  Name: string
  DeclaredType: string
  Default: string
  Description: string
}

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

  dirPath: string
  templateName: string
  paramsName?: string

  constructor(dirPath: string, templateName: string, paramsName?: string) {
    //TODO: validate here?

    this.dirPath = dirPath
    this.templateName = templateName
    this.paramsName = paramsName
  }

  validate() {
    let valid = validateBrackets(this.templateSpec)
    // TODO: validate params and params with templates together
    return valid
  }

  get templateSpec() {
    return readFileSync(join(this.dirPath, this.templateName))
  }

  get paramsSpec(): ParameterSpec[] {
    if(!this.paramsName) return []
    const paramsRaw = readFileSync(join(this.dirPath, this.paramsName))
    return parseConfig(paramsRaw)
  }

  render(incomingValues: { [key: string]: any }) {
    if(!this.paramsName) {
      return this.templateSpec
    }

    const defaultValues = flow(
      map<ParameterSpec, string[]>(p => [p.Name, p.Default]),
      fromPairs
    )(this.paramsSpec)

    const values = {
      ...defaultValues,
      ...incomingValues
    }

    let rendered: string
    try {
      rendered = renderTemplate(this.templateSpec, values)
    } catch(err) {
      log('error', err)
      throw err
    }
    return rendered
  }

}

export default TemplateDefinition