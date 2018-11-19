import React from 'react'
import { compose, pure } from 'recompose'
import { createComposer, ComponentDecorator } from 'recompost'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import ProcessingMessage, * as processing from '@shared/types/ProcessingMessage'
import { isAPIFormErrorBody } from '@shared/types/APIErrorBody'
import APIError from '@common/APIError'
import WebsocketListener from 'ui/templates/containers/WebsocketListener'
import { TemplateApiBag } from 'ui/templates/containers/TemplatesApi'
import UploadForm from './components/UploadForm'
import ListProgress from './components/ListProgress'

type UploadTemplateHandler = TemplateApiBag['templatesApi']['uploadTemplate']

const withProgressHandler = (BaseComponent: React.ComponentType<any>) => {
  class WithProgressHandler extends React.Component<Props & RouteComponentProps<any>, { progressUrl?: string, name?: string }> {
    state = {
      progressUrl: undefined,
      name: undefined
    }

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

    handleUpload = (name: string, file: File) => {
      const { handleTemplateUpload } = this.props

      return handleTemplateUpload(name, file)
        .then(result => {
          if(result) {
            this.setState({ progressUrl: result.location })
          }
        })
    }

    render() {
      const { progressUrl } = this.state
      return (
        <BaseComponent
          handleTemplateUpload={this.handleUpload}>
          {progressUrl && {
            progress: <ListProgress targetUrl={progressUrl} onClose={this.onWebsocketClose} />
          }}
        </BaseComponent>
      )
    }
  }
  return WithProgressHandler
}

const enhance = createComposer<{ handleTemplateUpload: UploadTemplateHandler } >()
  .withDecorator(withRouter)
  .withDecorator(withProgressHandler)
  .build()



type Props = {
  handleTemplateUpload: UploadTemplateHandler,
  children?: {
    progress: React.ReactNode
  }
}
const TemplateUpload = ({
  handleTemplateUpload,
  children
}: Props) => {
  return (
    <div>
      <UploadForm
        handleTemplateUpload={handleTemplateUpload} />
      {children && children.progress}
    </div>
  )
}

export default enhance(TemplateUpload)