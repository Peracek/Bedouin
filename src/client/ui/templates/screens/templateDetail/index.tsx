import React from 'react'

import TemplateApi from "ui/templates/containers/TemplateApi"
import TemplateDetail from './components/TemplateDetail'


type Props = {
  match: { url: string, params: { id: string } }
}
const TemplateDetailScreen = ({ match }: Props) => {
  const { url, params: { id } } = match

  return (
    <TemplateApi templateId={id}>
      {({ templateApi: { fetching, template, deployTemplate } }) => {
        if(fetching) return <></>
        return (
          <TemplateDetail template={template!} deployTemplate={deployTemplate} />
        )
      }}
    </TemplateApi>
  )
}

export default TemplateDetailScreen