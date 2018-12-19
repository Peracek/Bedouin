import React from 'react'
import { createComposer } from 'recompost'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { Template } from '@shared/types/Template'
import { TemplateApiBag } from 'ui/templates/containers/TemplateApi'
import DeployTab from './components/DeployTab'

type Props = {
  template: Template
  deployTemplate: TemplateApiBag['deployTemplate']
}
const enahnce = createComposer<Props>()
  .withState('tabIndex', 'setTab', 0)
  .build()

const TemplateDetail = enahnce((props) => {
  const { template, deployTemplate, tabIndex, setTab } = props

  return (
    <div>
      <AppBar position="static">
        <Tabs value={tabIndex} onChange={(_, value) => setTab(value)}>
          <Tab label="Deploy" />
          <Tab label="View specification" />
        </Tabs>
      </AppBar>
      {tabIndex === 0 && <DeployTab template={template} deployTemplate={deployTemplate} />}
      {tabIndex === 1 && <div>{template.templateSpec}</div>}
    </div>
  )
})

export default TemplateDetail