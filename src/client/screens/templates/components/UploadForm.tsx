import * as React from 'react'
import { withFormik, Formik, Field, FormikProps, FormikBag } from 'formik'

import { RichTextField } from '@components/formFields/TextField'

import handleFileUpload from '../handleFileUpload'


type FormProps = {
  handleSubmit(values: TODO): TODO,
  handleFileChange(arg: TODO): TODO
}
const Form = (props: FormProps) => (
  <Formik
    onSubmit={(values, actions) => {
      actions.setErrors({ name: 'je to chyba' })
      return
      props.handleSubmit(values)
        .then(() => {
          actions.setSubmitting(false)
        })
        .catch(() => {
          actions.setError('Unknown error')
        })
    }}
    initialValues={{
      name: ''
    }}
    render={formikProps => (
      <form onSubmit={formikProps.handleSubmit}>
        <RichTextField name="name" label="Name" />
        <input name="file" type="file" onChange={props.handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    )} />
)


type UploadFormProps = {
  handleUploadProgressAt?: (wsLocation: string) => void
}
type UploadFormState = {
  selectedFile: File | null
}
class UploadForm extends React.Component<UploadFormProps, UploadFormState> {

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    const selectedFile = files && files[0]
    this.setState({ selectedFile })
  }

  handleSubmit = (values: any) => {
    if(!this.state.selectedFile) {
      console.warn('no file selected')
      // FIXME: notify something?
      return
    }

    const { name } = values
    const { handleUploadProgressAt } = this.props
    return handleFileUpload(name, this.state.selectedFile)
      .then(location => {
        handleUploadProgressAt && handleUploadProgressAt(location)
      })
      .catch(err => {
        console.log(err)
        // FIXME: distinguish between axios error and other errors
        // FIXME: notify user about error
        debugger
        throw err
      })
  }

  render() {
    return (
      <Form
        handleSubmit={this.handleSubmit}
        handleFileChange={this.handleFileChange} />
    )
  }
}

export default UploadForm