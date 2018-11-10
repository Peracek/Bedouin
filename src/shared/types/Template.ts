import { Template, TemplateParameter } from '../../server/model'

export { Template, TemplateParameter }

// type Template = {
//   id: string,
//   name: string,
//   jobHCL: string,
//   jobJSON: string,
//   parameters?: TemplateParameters[]
// }

// type TemplateParameters = {
//   word: string,
//   label?: string,
//   description?: string,
//   type?: "string" | "boolean" | "number",
//   match?: RegExp,
//   defaultValue: string | boolean | number 
// }