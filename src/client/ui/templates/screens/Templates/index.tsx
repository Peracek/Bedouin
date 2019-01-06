import React from 'react'
import { createComposer } from 'recompost'

import BreadcrumbsToolbar from 'components/BreadcrumbsToolbar'
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
      <BreadcrumbsToolbar />
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