// import { parseHCLToJSON } from '../../../../nomadClient/index'
// import { NomadError } from '@common/Errors';
// import { APIError, APIErrorType } from '@common/APIError';

// const parse = async (jobHCL: string) => {
//   try {
//     return parseHCLToJSON(jobHCL)
//   } catch(err) {
//     if(err instanceof NomadError) {
//       throw new APIError(APIErrorType.TEMPLATE_PARSE_ERROR)
//     }
//     throw err
//   }
// }

// export default parse



import { parseHCLToJSON } from '../../../../nomadClient/index'

export default parseHCLToJSON