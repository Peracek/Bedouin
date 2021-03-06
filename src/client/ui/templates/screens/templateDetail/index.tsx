import React from 'react'
import { createComposer, ComponentDecorator } from 'recompost'

import { Tabs, Tab, Theme, withStyles, WithStyles, createStyles } from '@material-ui/core'

import BreadcrumbsToolbar from 'components/BreadcrumbsToolbar'
import { Template } from '@shared/types/Template'
import TemplateApi, { TemplateApiBag } from "ui/templates/containers/TemplateApi"
import DeployTab from './components/DeployTab'


const styles = (theme: Theme) => createStyles({
  toolbar: {
    backgroundColor: theme.palette.primary.dark,
    ...theme.mixins.mainContent,
  },
  tabs: {
    ...theme.mixins.mainContent,
    background: 'gray'
  },
  content: theme.mixins.mainContent
})

type Props = {
  template: Template
  deployTemplate: TemplateApiBag['deployTemplate']
}
const enahnce = createComposer<Props>()
  .withState('tabIndex', 'setTab', 0)
  .withDecorator(withStyles(styles) as ComponentDecorator<{}, WithStyles<typeof styles>>)
  .build()

const TemplateDetail = enahnce((props) => {
  const { template, deployTemplate, tabIndex, setTab, classes } = props
  return (
    <div>
      <BreadcrumbsToolbar />
      <Tabs value={tabIndex} onChange={(_, value) => setTab(value)} className={classes.tabs}>
        <Tab label="Deploy" />
        <Tab label="View specification" />
      </Tabs>
      <div className={classes.content}>
        {tabIndex === 0 && <DeployTab template={template} deployTemplate={deployTemplate} />}
        {tabIndex === 1 && <div>{template.templateSpec}</div>}
      </div>
    </div>
  )
})


type ScreenProps = {
  match: { url: string, params: { id: string } }
}
const TemplateDetailScreen = ({ match }: ScreenProps) => {
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