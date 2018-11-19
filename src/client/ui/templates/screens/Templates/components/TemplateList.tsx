import React from 'react'
import { Link } from 'react-router-dom'

import { Template } from '@shared/types/Template'
// import { routes } from 'ui/App'

const renderTemplate = (t: Template) => (
  <div key={t.name}>
    <Link to={`/templates/${t.name}`}>{t.name}</Link>
  </div>
)

type Props = {
  templates: Template[]
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