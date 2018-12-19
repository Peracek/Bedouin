import { ParameterSpec } from '../../server/templateManager/TemplateDefinition'

export type Template = {
  dirName: string
  templateSpec: string
  parametersSpec: ParameterSpec[]
}

export { ParameterSpec }
