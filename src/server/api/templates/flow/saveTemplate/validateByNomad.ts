import * as types from '@types'
import HCLToJSON from '@utils/HCLToJSON'

type jobDescription = types.Template['jobDescription']

const replaceParamsByDummyValue = (template: jobDescription) => 
  template.replace(/\[\[.*?\]\]/g, 'R4ND0M')

const nomadValidate = (json: string) =>
  new Promise<boolean>(resolve => resolve(true)) // FIXME: mock

const validateByNomad = async (template: jobDescription) => {
  const dummified = replaceParamsByDummyValue(template)

  let valid: boolean
  try {
  const json = HCLToJSON(dummified) // can throw
  valid = await nomadValidate(json)
  }
  catch(err) {
    console.log(err)
    throw(err)
  }
  return valid
}

export default validateByNomad