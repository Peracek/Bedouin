import * as React from 'react'


type State<T> = {
  opened: boolean,
  messages: T[]
}

const websocketListener = 
  <T>(targetUrl: string) => 
  (BaseComponent: React.ComponentType<any>) => 
  class extends React.Component<any, State<T>> {
    constructor(props: any) {
      super(props)
      this.state = {
        opened: false,
        messages: []
      }
    }

    componentDidMount() {
      const ws = new WebSocket(targetUrl)
      ws.addEventListener('open', () => {
        this.setState({ opened: true })
      })

      ws.addEventListener('message', event => {
        const message = JSON.parse(event.data) as T
        this.setState(state => ({
          messages: [
            ...state.messages,
            message
          ]
        }))
      })
    }

    render() {
      return React.createElement(
        BaseComponent, 
        {
          ...this.props,
          messages: this.state.messages
        }
      )
    }
  }

  export default websocketListener