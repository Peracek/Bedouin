import React from 'react'

import { Template } from '@shared/types/Template'
import { fetchTemplates, uploadTemplate } from './apiClient'

export type TemplateApiBag = {
  templatesApi: {
    templates?: Template[]
    fetching: boolean
    uploadTemplate: typeof uploadTemplate
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
    fetchTemplates()
      .then(templates => this.setState({ templates }))
  }

  render() {
    const { templates } = this.state
    const fetching = !Boolean(templates)
    const templatesApi = {
      templates,
      fetching,
      uploadTemplate
    }

    return this.props.children({ templatesApi })
  }
} 

export default TemplatesApi