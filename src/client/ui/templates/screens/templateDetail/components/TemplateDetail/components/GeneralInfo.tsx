import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

import Button from '@material-ui/core/Button'

import { Template } from '@shared/types/Template';
import routes from 'ui/routes'

type Props = {
  template: Template
}
const GeneralInfo = ({ template }: Props) => (
  <div>
    <Button
      size="large"
      component={props => <Link to={routes.templateRun.pathWithId(template.id)} {...props as any} />}
    >
      Run job
    </Button>
  </div>
)

export default GeneralInfo