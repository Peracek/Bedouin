import Template from '@model/Template'
import * as types from '@types'
import { AppError } from '@common/Errors'

const saveToDb = async (template: types.Template) => {
  const { name, jobJSON } = template
  
  const templateToSave = new Template({ name, jobJSON })

  return templateToSave
    .save()
    .then(document => document.id as string)
    .catch(err => {
      throw new AppError('', err)
    })
}

export default saveToDb