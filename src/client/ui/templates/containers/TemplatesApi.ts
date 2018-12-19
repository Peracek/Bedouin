import React from 'react'

import { TemplateDir } from '@shared/types/TemplateDir'
import { templatesApi, TemplatesApi as TemplatesApiSchema } from 'apiClient'

export type TemplateApiBag = {
  templatesApi: {
    templates?: TemplateDir[]
    fetching: boolean
  }
}
type Props = {
  children: (props: TemplateApiBag) => JSX.Element
}
type State = {
  templates?: TemplateDir[]
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
    }

    return this.props.children({ templatesApi: templatesApiBag })
  }
} 

export default TemplatesApi