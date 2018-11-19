import React from 'react'


type Props<T> = {
  children: (props: { messages: T[] }) => JSX.Element
  targetUrl: string,
  onMessage?: (message: T) => void,
  onClose?: (code: number) => void
}
type State<T> = {
  opened: boolean,
  messages: T[]
}


class WebsocketListener<T> extends React.Component<Props<T>, State<T>> {
  constructor(props: any) {
    super(props)
    this.state = {
      opened: false,
      messages: []
    }
  }

  componentDidMount() {
    const { targetUrl, onMessage, onClose } = this.props
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
    const { messages } = this.state
    return this.props.children({ messages })
  }
}


export default WebsocketListener