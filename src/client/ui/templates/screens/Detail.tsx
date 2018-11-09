import * as React from 'react'

import TemplateDetail from '../components/TemplateDetail'
import withTemplate from '../containers/withTemplate'


const TemplateDetailWithData = withTemplate('what-ev for now')(TemplateDetail)

export default () => (
  <TemplateDetailWithData />
)