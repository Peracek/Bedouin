import React from 'react'
import { createComposer } from 'recompost'
// import { RouteComponentProps } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import TemplatesApi, { TemplateApiBag } from '../../containers/TemplatesApi'
import TemplateList from './components/TemplateList'
import TemplateUpload from './components/TemplateUpload'


type Props = TemplateApiBag
const enhance = createComposer<Props>()
  .withState('upload', 'showUploadForm', false)
  .build()
const Templates = enhance(({ upload, showUploadForm, templatesApi: { templates, fetching, uploadTemplate }}) => {
  if(fetching) {
    return (
      <span>Spinna...</span>
    )
  }

  let uploadSection: JSX.Element
  if(upload) {
    uploadSection = <TemplateUpload handleTemplateUpload={uploadTemplate} />
  } else {
    uploadSection = <Button onClick={() => showUploadForm(true)} color="primary">add new template</Button>
  }

  return (
    <div>
      {uploadSection}
      <TemplateList templates={templates!} />
    </div>
  )
})



const EnhancedTemplates = () => (
  <TemplatesApi>
    {props => <Templates {...props} />}
  </TemplatesApi>
)

export default EnhancedTemplates