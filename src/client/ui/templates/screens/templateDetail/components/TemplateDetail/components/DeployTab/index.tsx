import React from 'react'
import { Formik } from 'formik'
import { Redirect } from 'react-router-dom'
import { fromPairs } from 'lodash'

import Button from '@material-ui/core/Button'

import APIError from 'apiClient/APIError'
import notify from '@common/notify'
import { Template } from '@shared/types/Template'
import TextField from 'components/formFields/TextField'
import { TemplateApiBag } from 'ui/templates/containers/TemplateApi'
import routes from 'ui/routes'


type Props = {
  template: Template
  handleSubmit(values: {[key: string]: any}): Promise<boolean>
  redirectTo?: string
}
const DeployTab = ({ template, handleSubmit, redirectTo }: Props) => {
  const { parametersSpec } = template
  const initialVals = parametersSpec.map(param => [param.Name, param.Default || ''])

  return (
    <div>
      {redirectTo && <Redirect to={redirectTo}/>}
      <Formik 
        initialValues={fromPairs(initialVals)} 
        onSubmit={async (values, actions) => {
          const success = await handleSubmit(values)
          actions.setSubmitting(!success)
        }
      }>
        {(formikBag) => (
          <form onSubmit={formikBag.handleSubmit}>
          {parametersSpec.map(param => (
            <TextField key={param.Name} label={param.Name} name={param.Name} />
          ))}
          <Button type="submit">Do it!</Button>
        </form>
        )}
      </Formik>
      {/* <Button
        size="large"
        component={props => <Link to={routes.templateRun.pathWithId(template.id)} {...props as any} />}
      >
        Run job
      </Button> */}
    </div>
  )
}


type EnhancerProps = {
  template: Template
  deployTemplate: TemplateApiBag['deployTemplate']
}
type EnhancerState = {
  deployError?: string
  redirectTo?: string
}
const enhance = (BaseComponent: React.ComponentType<Props>) => {
  class Enhance extends React.Component<EnhancerProps, EnhancerState> {
    state = { deployError: undefined, redirectTo: undefined }
    deployTemplate = async (values: {[key: string]: any}) => {
      let jobName: string
      try {
        jobName = await this.props.deployTemplate(values)
      }
      catch(err) {
        if(err instanceof APIError) {
          this.setState({ deployError: err.errorMessage })
        }
        notify.error('Server error')
        return false
      }
      this.setState({ redirectTo: routes.jobDetail.pathWithId(jobName) })
      return true
    }

    render() {
      const { template } = this.props

      return (
        <BaseComponent 
          template={template}
          handleSubmit={this.deployTemplate}
          redirectTo={this.state.redirectTo} />
      )
    }
  }

  return Enhance
}

export default enhance(DeployTab)