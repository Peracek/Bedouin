import React from 'react'

import { Template } from '@shared/types/Template'
// import { fetchTemplates, uploadTemplate } from './apiClient'
import { templatesApi, TemplatesApi as TemplatesApiSchema } from 'apiClient'

export type TemplateApiBag = {
  templatesApi: {
    templates?: Template[]
    fetching: boolean
    uploadTemplate: TemplatesApiSchema['upload']
  }
}
type Props = {
  children: (props: TemplateApiBag) => JSX.Element
}
type State = {
  templates?: Template[]
}
class TemplatesApi extends React.Component<Props, State> {
  state = {
    templates: undefined
  }

  componentDidMount() {
    templatesApi.fetch()
      .then(templates => this.setState({ templates }))
  }

  render() {
    const { templates } = this.state
    const fetching = !Boolean(templates)
    const templatesApiBag = {
      templates,
      fetching,
      uploadTemplate: templatesApi.upload
    }

    return this.props.children({ templatesApi: templatesApiBag })
  }
} 

export default TemplatesApi