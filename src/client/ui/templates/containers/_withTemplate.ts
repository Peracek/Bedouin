import * as React from 'react'

import { Template } from '@shared/types/Template'
import fetchTemplate from '../fetchTemplate'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Subtract<T, K> = Omit<T, keyof K>

const SomeKindOfSpinner = () => React.createElement('span', null, "spininnn...")

type State = { template?: Template }
const withTemplate = (templateId: string) => <T extends {template: Template}>(BaseComponent: React.ComponentType<T>) => {
  return class extends React.Component<Subtract<T, {template: Template}>, State> {
    state = {} as State

    componentDidMount() {
      fetchTemplate(templateId)
        .then(template => {
          this.setState({ template })
        })
    }

    render() {
      const { template } = this.state
      const props = {
        ...(this.props as any), // TS bug workaround
        template
      }

      if(!this.state.template) {
        return React.createElement(SomeKindOfSpinner)
      }
      return React.createElement(BaseComponent, props)
    }
  }
}

export default withTemplate
