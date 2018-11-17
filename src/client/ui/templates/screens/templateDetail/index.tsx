import React, { memo } from 'react'
import { Route, Link } from 'react-router-dom'

import TemplateDetail from './components/TemplateDetail'
import TemplateApi, { TemplateApiBag } from 'ui/templates/containers/TemplateApi';


type DetailProps = { url: string, templateApi: TemplateApiBag }
const Detail = ({ url, templateApi }: DetailProps) => {
  if(templateApi.fetching) {
    return (
      <span>Spinna...</span>
    )
  }
  const {
    template,
    postParameters
  } = templateApi
  return (
    <div>
      <Route exact path={url} render={() => (
        <TemplateDetail template={template!} postParameters={postParameters} />
      )}/>
      <Route path={`${url}/run`} render={() => (
        <div>template run dialog HERE <Link to='./'>back</Link></div>
      )}/>
    </div>
  )
}

type DetailWithTemplateProps = {
  match: { url: string, params: { id: string } }
}
const DetailWithTemplate = ({ match }: DetailWithTemplateProps) => {
  const { url, params: { id } } = match
  return (
    <TemplateApi templateId={id}>
      {(apiProps: TODO) => <Detail {...apiProps} url={url} />}
    </TemplateApi>
  )
}

export default memo(DetailWithTemplate)