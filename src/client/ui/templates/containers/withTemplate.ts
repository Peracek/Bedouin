import * as React from 'react'


type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Subtract<T, K> = Omit<T, keyof K>
type Template = { name: string }
const SomeKindOfSpinner = () => React.createElement('span', null, "spininnn...")

type State = { template?: Template }
const withTemplate = (templateId: string) => <T extends {template: Template}>(BaseComponent: React.ComponentType<T>) => {
  return class extends React.Component<Subtract<T, {template: Template}>, State> {
    state = {} as State

    componentDidMount() {
      setTimeout(() => {
        this.setState({ template: { name: 'test' } })
      }, 3000)
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
