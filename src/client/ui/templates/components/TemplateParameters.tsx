// import React from 'react'

// import { TemplateParameter } from '@shared/types/Template'
// import ParameterForm from './ParameterForm'

// type Props = {
//   parameters: TemplateParameter[]
// }
// const TemplateParameters = ({ parameters }: Props) => {
  
//   const renderParameter = (p: TemplateParameter) => (
//     <div key={p.word}>
//       <h3>{p.word}</h3>
//       <ParameterForm initialValues={{test:'test'}} handleSubmit={() => console.log('hahaa handle')} />
//     </div>
//   )

//   return (
//     <div>
//       {parameters.map(p => renderParameter(p))}
//     </div>
//   )
// }

// export default TemplateParameters