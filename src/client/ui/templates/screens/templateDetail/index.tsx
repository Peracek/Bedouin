import React, { memo } from 'react'

import TemplateDetail from './components/TemplateDetail'


type Props = { match: { params: { name: string } } }
const Detail = ({ match }: Props) => {
  const { name } = match.params

  return (
    <TemplateDetail templateName={name} />
  )
}

export default memo(Detail)