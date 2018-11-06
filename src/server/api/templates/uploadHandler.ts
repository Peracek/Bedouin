import multer, { Options } from 'multer'
import path from 'path'

import { APIError, APIErrorType } from '@common/APIError'

type FileFilter = Options['fileFilter']

const createFileFilter = (fieldName: string): FileFilter => (_, file, cb) => {
  console.log(file)
  var ext = path.extname(file.originalname);
  if(ext !== '.m') {
    const err = new APIError(APIErrorType.TEMPLATE_FILE_BAD_EXTENSION, 422, { field: fieldName })
    return cb(err, false)
  }
  cb(null, true)
}
const storage = multer.memoryStorage()
const uploadHandler = 
  (fieldName: string) => multer({ 
    storage: storage, 
    fileFilter: createFileFilter(fieldName)
  }).single(fieldName)

export default uploadHandler