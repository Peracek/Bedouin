import * as React from 'react'
import { withFormik, Formik, Field, FormikProps, FormikBag } from 'formik'

import TextField from '@components/formFields/TextField'

import { isAPIFormErrorBody } from '@shared/types/APIErrorBody';
import richField from '@components/formFields/richField';
import APIError from '@common/APIError';

const FileInput = ({ handleFileChange }: { handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => <input name="file" type="file" onChange={handleFileChange} />
const RichFileInput = richField(FileInput)

type FormProps = {
  handleSubmit(values: TODO): TODO,
  handleFileChange(arg: TODO): TODO,
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
          console.log(err)
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
      file: '' // this is just fake for enable setting formik errors
    }}
    render={formikProps => (
      <form onSubmit={formikProps.handleSubmit}>
        <TextField name="name" label="Name" />
        <RichFileInput name="file" label="Template" handleFileChange={e => {formikProps.setFieldValue('file', ''); props.handleFileChange(e)}} />
        <button type="submit">Submit</button>
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

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    const selectedFile = files && files[0]
    this.setState({ selectedFile })
  }

  handleSubmit = (values: any) => {
    const { selectedFile } = this.state

    if(!selectedFile) {
      console.warn('no file selected')
      return Promise.reject({ file: 'no file man' })
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
        handleFileChange={this.handleFileChange}
        errors={this.state.errors} />
    )
  }
}

export default UploadForm