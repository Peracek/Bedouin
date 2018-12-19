import React from 'react'
import { createComposer } from 'recompost'

import TemplatesApi, { TemplateApiBag } from '../../containers/TemplatesApi'
import TemplateList from './components/TemplateList'


type Props = TemplateApiBag
const enhance = createComposer<Props>()
  .withState('upload', 'showUploadForm', false)
  .build()
const Templates = enhance(({ templatesApi: { templates, fetching }}) => {
  if(fetching) {
    return (
      <span>Spinna...</span>
    )
  }
  return (
    <div>
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