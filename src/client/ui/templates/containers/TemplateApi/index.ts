import React from 'react'

import { Template } from '@shared/types/Template'
import createApiClient, { ApiClient } from './apiClient'

export type TemplateApiBag = { 
  template?: Template, 
  fetching: boolean,
  postParameters: ApiClient['postParameters'],
  runTemplate: ApiClient['runTemplate']
}
type Props = { templateId: string, children: (props: { templateApi: TemplateApiBag }) => JSX.Element }
type State = { template?: Template }


class TemplateApi extends React.Component<Props, State> {
  state = {
    template: undefined
  }
  apiClient: ApiClient = createApiClient(this.props.templateId)

  componentDidMount() {
    const { templateId } = this.props
    this.apiClient = createApiClient(templateId)
    this.apiClient.fetchTemplate()
      .then(template => {
        this.setState({ template })
      })
  }

  render() {
    const { template } = this.state
    const fetching = !Boolean(template)
    const templateApi = {
      template,
      fetching,
      postParameters: this.apiClient.postParameters,
      runTemplate: this.apiClient.runTemplate
    
    }
    return this.props.children({ templateApi })
  }
}

export default TemplateApi