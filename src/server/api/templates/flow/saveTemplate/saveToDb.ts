import TemplateModel, { Template } from '@model/Template'
import { AppError } from '@common/Errors'

const saveToDb = async (template: Template) => { 
  const templateToSave = new TemplateModel(template)

  return templateToSave
    .save()
    .then(document => document.id as string)
    .catch(err => {
      throw new AppError('', err)
    })
}

export default saveToDb