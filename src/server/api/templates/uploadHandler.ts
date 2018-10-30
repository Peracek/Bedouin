import multer, { Options } from 'multer'
import { RequestHandler, ErrorRequestHandler } from 'express'

import { doesTemplateNameAlreadyExist } from './controller'
import { APIError } from '@common/Error';


// FIXME: check for filetype
type FileFilter = Options['fileFilter']

const fileFilter: FileFilter = (req, file, cb) => {
  console.log(file)
  //cb(null, true)
  // check for filetype
}
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export default (fieldName: string) => {
  const uploadHandler = upload.single(fieldName)

  const nameDuplicateHandler: RequestHandler = async (req, res, next) => {
    const { name } = req.body
    const isDuplicit = await doesTemplateNameAlreadyExist(name)
    if(isDuplicit) {
      next(new APIError('template_name_duplicate', { name }, 409 ))
      return
    }
    next()
  }

  return [
    uploadHandler,
    nameDuplicateHandler
  ]
}