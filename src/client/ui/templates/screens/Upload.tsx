import * as React from 'react'
import { compose, pure } from 'recompose'

import UploadForm from '../components/UploadForm'
import ListProgress from '../components/ListProgress'
import websocketListener from '../containers/websocketListener'


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
  class WithProgressHandler extends React.Component<{}, { url: string }> {
    UploadProgress: React.ComponentType | undefined
    
    setUrl = (url: string) => {
      this.UploadProgress = websocketListener(url)(ListProgress)
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
  withProgressHandler
)(render)