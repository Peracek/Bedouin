import axios from 'axios'
import { Field, Formik } from 'formik'
import * as React from 'react'
// import { compose, withState } from 'recompose'

import { ProcessingMessage } from '@shared/types'
import absolutify from './utils/absolutify'


class Upload extends React.Component<{}, { file?: any, processing: boolean, progress: any[] }> {

  constructor(props: {}) {
    super(props)
    this.state = { progress: [] as ProcessingMessage[], processing: false }
  }

  handleSubmit = (values: any) => {
    const { name } = values
    const data = new FormData()
    data.append('name', name)
    data.append('file', this.state.file)

    this.setState({ processing: true })

    axios
    .post('/api/templates', data)
    .then(response => {
      console.log(response)
      const { location } = response.headers
      this.subscribeForProgress(location) 
    })
  }

  subscribeForProgress = (location: string) => {
    const url = absolutify(location, 'ws:')
    const ws = new WebSocket(url)

    ws.addEventListener('open', function (event) {
      console.log('opened')
    });

    this.setState({ progress: [] })
    
    // Listen for messages
    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data) as ProcessingMessage
      const progress = [ ...this.state.progress, message ]
      this.setState({ progress })
      console.log('Message from server ', event.data)
    });
  }

  setFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      const file = event.target.files[0]
      this.setState({ file })
    }
  }

  render() {
    const progress = this.state.progress.map(p => <div>{p.name}:{p.status}</div>)
    return (
      <div>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={(values, actions) => {
            this.handleSubmit(values)
            actions.setSubmitting(false)
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <Field name="name" type="text" />
              <input name="file" type="file" onChange={this.setFile} />
              {/* <Field name="file" type="file" /> */}
              <button type="submit">Submit</button>
            </form>
          )} />
        {progress}
       
      </div>
    )
  }
}

// export default enhance(component)
export default Upload