//@ts-ignore
import hcl from 'gopher-hcl' // FIXME: add typing to gopher

import { AppError } from '@common/AppError'

const HCLToJSON = (template: string) => {
  try {
    return <string>hcl.parse(template)
  }
  catch (err) {
    throw(new AppError('HCLERR'))
  }
}

export default HCLToJSON