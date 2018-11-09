import React, { memo } from 'react'

import TemplateDetail from '../components/TemplateDetail'
import withTemplate from '../containers/withTemplate'


type Props = { match: { params: { id: string } } }
const Detail = ({ match }: Props) => {
  const { id } = match.params
  const TemplateDetailWithData = withTemplate(id)(TemplateDetail)

  return (
    <TemplateDetailWithData />
  )
}

export default memo(Detail)