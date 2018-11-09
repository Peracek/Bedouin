import * as React from 'react'
import { withFormik, Formik, Field, FormikProps, FormikBag } from 'formik'

import { RichTextField } from '@components/formFields/TextField'

import handleFileUpload from '../handleFileUpload'
import { isAPIFormErrorBody } from '@shared/types/APIErrorBody';
import richField from '@components/formFields/richField';

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
      file: '' // this is just fake for setting formik errors
    }}
    render={formikProps => (
      <form onSubmit={formikProps.handleSubmit}>
        <RichTextField name="name" label="Name" />
        <RichFileInput name="file" label="Template" handleFileChange={e => {formikProps.setFieldValue('file', ''); props.handleFileChange(e)}} />
        <button type="submit">Submit</button>
      </form>
    )} />
)


type UploadFormProps = {
  handleUploadProgressAt?: (wsLocation: string) => void
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
    if(!this.state.selectedFile) {
      console.warn('no file selected')
      // FIXME: notify something?
      return Promise.reject({ file: 'no file man' })
    }

    const { name } = values
    const { handleUploadProgressAt } = this.props
    return handleFileUpload(name, this.state.selectedFile)
      .then(result => {
        if('location' in result) {
          handleUploadProgressAt && handleUploadProgressAt(result.location)
        } else {
          if(isAPIFormErrorBody(result)) {
            const { type, params: { field } } = result.error
            return Promise.reject({ [field]: type })
          }
        }
        return Promise.resolve()
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