import React from 'react'

import { Template } from '@shared/types/Template'
import { templateApi, TemplateApi as TemplateApiSchema } from 'apiClient' 

export type TemplateApiBag = { 
  template?: Template
  fetching: boolean
  postParameters: TemplateApiSchema['postParameters']
  runTemplate: TemplateApiSchema['runTemplate']
}
type Props = { templateId: string, children: (props: { templateApi: TemplateApiBag }) => JSX.Element }
type State = { fetching: boolean, template?: Template }


class TemplateApi extends React.Component<Props, State> {
  state = {
    fetching: true
  } as State
  apiClient: TemplateApiSchema = templateApi(this.props.templateId)

  componentDidMount() {
    this.fetch()
  }

  render() {
    const { template } = this.state
    const fetching = !Boolean(template)
    const postParameters: TemplateApiSchema['postParameters'] = values => (
      this.apiClient.postParameters(values).then(() => {
        this.fetch()
        return
      })
    )
    const templateApi = {
      template,
      fetching,
      postParameters,
      runTemplate: this.apiClient.runTemplate
    
    }
    return this.props.children({ templateApi })
  }

  fetch() {
    this.setState({ fetching: true })
    this.apiClient.fetch()
      .then(template => {
        this.setState({
          template,
          fetching: false
        })
      })
  }
}

export default TemplateApi