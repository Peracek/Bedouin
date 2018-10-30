//@ts-ignore
import hcl from 'gopher-hcl' // FIXME: add typing to gopher

import { AppError } from '@common/Error'

const HCLToJSON = (template: string) => {
  try {
    return <string>hcl.parse(template)
  }
  catch (err) {
    throw(new AppError('HCLERR'))
  }
}

export default HCLToJSON