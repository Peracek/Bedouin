import React from 'react'
import { Formik, FormikActions } from 'formik'
import { flow, map, fromPairs } from 'lodash/fp'

import { Template, TemplateParameter } from '@shared/types/Template'
import ParameterValuesForm from './components/ParameterValuesForm'


const initializeValues = (parameters: TemplateParameter[]) => {
  return flow(
    map<TemplateParameter, any>(p => ([p.word, p.defaultValue || '' ])),
    fromPairs
  )(parameters)
}


type Props = {
  template: Template
  handleRun: (parameterValues: TODO) => Promise<TODO>
}
class TemplateRun extends React.Component<Props> {
  ref = React.createRef<Formik<any, any>>()
  submitFormik = () => this.ref.current!.handleSubmit(undefined)

  render() {
    const { template, handleRun } = this.props

    let initialValues = {}
    let paramSection: JSX.Element

    if(template.parameters) {
      initialValues = initializeValues(template.parameters)
      paramSection = <ParameterValuesForm parameters={template.parameters} />
    } else {
      paramSection = <span>all set!</span>
    }

    return (
      <div>
        <h2>Run it</h2>
        <Formik
          ref={this.ref}
          initialValues={initialValues}
          onSubmit={(values, actions: FormikActions<any>) => {
            handleRun(values).then(() => {
              actions.setSubmitting(false)
            })
          }}>
          {paramSection}
        </Formik>
        <button onClick={this.submitFormik}>run run run</button>
      </div>
    )
  }
}

export default TemplateRun