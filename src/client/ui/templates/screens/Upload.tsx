import * as React from 'react'
import { compose, pure } from 'recompose'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import UploadForm from '../components/UploadForm'
import ListProgress from '../components/ListProgress'
import websocketListener from '../containers/websocketListener'
import ProcessingMessage, * as processing from '@shared/types/ProcessingMessage'


const render = ({
  handleUploadProgressAt,
  UploadProgress
}: TODO) => {
  return (
    <div>
      <UploadForm
        handleUploadProgressAt={handleUploadProgressAt} />
        {UploadProgress && <UploadProgress />}
    </div>
  )
}


const withProgressHandler = (BaseComponent: React.ComponentType<any>) => {
  class WithProgressHandler extends React.Component<RouteComponentProps<any>, { url: string, name?: string }> {
    UploadProgress: React.ComponentType | undefined

    onWebsocketMessage = (message: ProcessingMessage) => {
      if(message.event === processing.Event.SAVING) {
        const { name } = (message.params as { name: string })
        this.setState({ name })
      }
    }

    onWebsocketClose = (code: number) => {
      if(code === 1000) {
        this.props.history.push(`/detail/${this.state.name}`)
      } else {
        alert('TODO: notify user of error')
      }
    }
    
    setUrl = (url: string) => {
      this.UploadProgress = websocketListener<ProcessingMessage>(url, this.onWebsocketMessage, this.onWebsocketClose)(ListProgress)
      this.setState({ url })
    }

    render() {
      return (
        <BaseComponent
          handleUploadProgressAt={this.setUrl}
          UploadProgress={this.UploadProgress} />
      )
    }
  }
  return WithProgressHandler
}

export default compose(
  pure,
  withRouter,
  withProgressHandler
)(render)