import TemplateModel, { Template } from '@model/Template'
import { AppError } from '@common/Errors'

const saveToDb = async (template: Template) => {
  const { name, jobJSON } = template
  
  const templateToSave = new TemplateModel({ name, jobJSON })

  return templateToSave
    .save()
    .then(document => document.id as string)
    .catch(err => {
      throw new AppError('', err)
    })
}

export default saveToDb