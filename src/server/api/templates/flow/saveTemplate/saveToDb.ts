import Template from '@model/Template'
import * as types from '@types'
import { AppError } from '@common/AppError'

const saveToDb = (template: types.Template) => {
  const { name, jobDescription } = template
  
  const templateToSave = new Template({ name, jobDescription })

  return templateToSave
    .save()
    .catch(err => {
      throw new AppError('DBERR')
    })
}

export default saveToDb