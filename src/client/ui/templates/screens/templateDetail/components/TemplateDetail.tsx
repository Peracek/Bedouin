import React from 'react'
import { Link } from 'react-router-dom'
import { createComposer } from 'recompost'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { Template, TemplateParameter } from '@shared/types/Template'
import ParametersForm from './ParametersForm'
import TemplateApi from '../../../containers/TemplateApi'

type Props = {
  template: Template
  postParameters: ( parameters: TemplateParameter[] ) => any
}
const enahnce = createComposer<Props>()
  .withState('tabIndex', 'setTab', 2)
  .build()

const TemplateDetail = enahnce((props) => {
  const { template, tabIndex, setTab } = props

  return (
    <div>
      <AppBar position="static">
        <Tabs value={tabIndex} onChange={(_, value) => setTab(value)}>
          <Tab label="General" />
          <Tab label="Definition" />
          {template.parameters && <Tab label="Parameters" />}
        </Tabs>
      </AppBar>
      {tabIndex === 0 && <div>Job general info</div>}
      {tabIndex === 1 && <div>{template.jobHCL}</div>}
      {tabIndex === 2 && <ParametersForm parameters={template.parameters!} handleSubmit={props.postParameters} />}
    </div>
  )

  // return (
  //   <div>
  //     <h2>{template.name}</h2>
  //     {template.parameters && <ParametersForm parameters={template.parameters} handleSubmit={props.postParameters} />}
  //     <button>Edit template params</button>
  //     <Link to={`${template.name}/run`}>Run job</Link>
  //     <button>Back to list</button>
  //   </div>
  // )
})

export default TemplateDetail