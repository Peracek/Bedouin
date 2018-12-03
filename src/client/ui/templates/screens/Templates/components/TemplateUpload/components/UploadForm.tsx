import React from 'react'
import { Formik } from 'formik'

import Button from '@material-ui/core/Button'

import TextField from '@components/formFields/TextField'
import FileField from '@components/formFields/FileField'
import APIError from '@common/APIError';


type FormProps = {
  handleSubmit(values: any): Promise<void>
  onFileChange(e: React.ChangeEvent<any>): void
  errors?: { [key: string]: string }
}
const Form = (props: FormProps) => (
  <Formik
    onSubmit={(values, actions) => {
      props.handleSubmit(values)
        .then(() => {
          actions.setSubmitting(false)
        })
        .catch((err: any) => {
          actions.setErrors(err)
        })
    }}
    validate={values => {
      const { name } = values
      if(!name || name.length === 0) {
        return { name: 'Cannot be empty' }
      }
    }}
    initialValues={{
      name: '',
      file: ''
    }}
    render={formikProps => (
      <form onSubmit={formikProps.handleSubmit}>
        <TextField name="name" label="Name" />
        <FileField name="file" label="Template" onChange={e => {props.onFileChange(e)}} />
        <Button type="submit">Submit</Button>
      </form>
    )} />
)


type UploadFormProps = {
  handleTemplateUpload: (name: string, file: File) => Promise<any>
}
type UploadFormState = {
  selectedFile: File | null,
  errors: { [key: string]: string }
}
class UploadForm extends React.Component<UploadFormProps, UploadFormState> {
  state = {} as UploadFormState

  onFileChange = (event: React.ChangeEvent<any>) => {
    const { files } = event.target
    const selectedFile = files && files[0]
    this.setState({ selectedFile })
  }

  handleSubmit = (values: any) => {
    const { selectedFile } = this.state

    if(!selectedFile) {
      return Promise.reject({ file: 'No file selected' })
    }

    return this.props.handleTemplateUpload(values.name, selectedFile)
      .catch((apiError: APIError) => {
        if(apiError.formError) {
          const { type, params: { field } } = apiError.formError
          this.setState({ errors: { [field]: type } })
        }
      })
  }

  render() {
    return (
      <Form
        handleSubmit={this.handleSubmit}
        onFileChange={this.onFileChange}
        errors={this.state.errors} />
    )
  }
}

export default UploadForm