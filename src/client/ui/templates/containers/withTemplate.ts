import React from 'react'

import { Template } from '@shared/types/Template'
import fetchTemplate from '../fetchTemplate'

type ChildrenProps = { template?: Template, fetching: boolean }
type Props = { templateId: string, children: (props: ChildrenProps) => JSX.Element }
type State = { template?: Template }


class WithTemplate extends React.Component<Props, State> {
  state = {
    template: undefined
  }

  componentDidMount() {
    const { templateId } = this.props
    fetchTemplate(templateId)
      .then(template => {
        this.setState({ template })
      })
  }

  render() {
    const { template } = this.state
    const fetching = !Boolean(template)
    const children =  this.props.children
    return React.createElement('div', null, children({ template, fetching }))
  }
}

export default WithTemplate