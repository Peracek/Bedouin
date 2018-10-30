import axios from 'axios'
import { Field, Formik } from 'formik'
import * as React from 'react'
// import { compose, withState } from 'recompose'

import { ProcessingMessage } from '@shared/types'
import absolutify from './utils/absolutify'
import websocketListener from './screens/templates/containers/websocketListener';
import ListProgress from './screens/templates/components/ListProgress';


class Upload extends React.Component<{}, { file?: any, processing: boolean, location?: string }> {

  constructor(props: {}) {
    super(props)
    this.state = { processing: false }
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
      let { location } = response.headers
      location = absolutify(location, 'ws:')
      this.setState({ location })
    })
  }

  setFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      const file = event.target.files[0]
      this.setState({ file })
    }
  }

  render() {
    // FIXME: just trial. don't do this in render!
    let Progress: React.ComponentType | null = null
    if(this.state.location) {
      Progress = websocketListener<ProcessingMessage>(this.state.location)(ListProgress)
    }

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
        { Progress && <Progress /> }
      </div>
    )
  }
}

// export default enhance(component)
export default Upload