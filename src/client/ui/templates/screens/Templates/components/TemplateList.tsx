import React from 'react'
import { Link } from 'react-router-dom'

import { TemplateDir } from '@shared/types/TemplateDir'
// import { routes } from 'ui/App'

const renderTemplate = (t: TemplateDir) => (
  <div key={t.dirPath}>
    <Link to={`/templates/${t.dirPath}`}>{t.dirPath}</Link>
  </div>
)

type Props = {
  templates: TemplateDir[]
}
const TemplateList = ({ templates }: Props) => {
  if(templates.length === 0) {
    return <span>No templates yet</span>
  }
  
  return (
    <div>
      {templates.map(t => renderTemplate(t))}
    </div>
  )
}

export default TemplateList