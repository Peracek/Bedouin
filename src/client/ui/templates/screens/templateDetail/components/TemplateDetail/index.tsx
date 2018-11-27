import React from 'react'
import { createComposer } from 'recompost'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { Template, TemplateParameter } from '@shared/types/Template'
import GeneralInfo from './components/GeneralInfo'
import ParametersForm from './components/ParametersForm'

type Props = {
  template: Template
  postParameters: ( parameters: TemplateParameter[] ) => Promise<void>
}
const enahnce = createComposer<Props>()
  .withState('tabIndex', 'setTab', 0)
  .build()

const TemplateDetail = enahnce((props) => {
  const { template, postParameters, tabIndex, setTab } = props

  return (
    <div>
      <AppBar position="static">
        <Tabs value={tabIndex} onChange={(_, value) => setTab(value)}>
          <Tab label="General" />
          <Tab label="Definition" />
          {template.parameters && <Tab label="Parameters" />}
        </Tabs>
      </AppBar>
      {tabIndex === 0 && <GeneralInfo template={template} />}
      {tabIndex === 1 && <div>{template.jobHCL}</div>}
      {tabIndex === 2 && <ParametersForm parameters={template.parameters!} handleSubmit={postParameters} />}
    </div>
  )
})

export default TemplateDetail