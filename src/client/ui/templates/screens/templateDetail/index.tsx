import React from 'react'
import { Route } from 'react-router'

import TemplateApi from "ui/templates/containers/TemplateApi"
import TemplateDetail from './components/TemplateDetail'
import TemplateRun from './components/TemplateRun'


type Props = {
  match: { url: string, params: { id: string } }
}
const TemplateDetailScreen = ({ match }: Props) => {
  const { url, params: { id } } = match

  return (
    <TemplateApi templateId={id}>
      {({ templateApi: { fetching, template, postParameters, runTemplate } }) => {
        if(fetching) return <></>
        return (
          <div>
            <Route path={url} exact render={() => (
              <TemplateDetail template={template!} postParameters={postParameters} />
            )} />
            <Route path={`${url}/run`} render={() => (
              <TemplateRun template={template!} handleRun={runTemplate} />
            )} />
          </div>
        )
      }}
    </TemplateApi>
  )
}

export default TemplateDetailScreen