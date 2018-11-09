import React from 'react'


type State<T> = {
  opened: boolean,
  messages: T[]
}

const websocketListener = 
  <T>(targetUrl: string, onMessage?: (message: T) => void, onClose?: (code: number) => void) => 
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
        onMessage && onMessage(message)
        this.setState(state => ({
          messages: [
            ...state.messages,
            message
          ]
        }))
      })

      ws.addEventListener('close', event => {
        onClose && onClose(event.code)
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