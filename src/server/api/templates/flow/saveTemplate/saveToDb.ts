import Template from '@model/Template'
import * as types from '@types'
import { AppError } from '@common/Errors'

const saveToDb = (template: types.Template) => {
  const { name, jobJSON } = template
  
  const templateToSave = new Template({ name, jobJSON })

  return templateToSave
    .save()
    .catch(err => {
      throw new AppError('', err)
    })
}

export default saveToDb