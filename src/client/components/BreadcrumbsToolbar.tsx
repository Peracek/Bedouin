import React from 'react'
import withBreadcrumbs from 'react-router-breadcrumbs-hoc'
import { NavLink } from 'react-router-dom'
import { createComposer, ComponentDecorator } from 'recompost'

import { Toolbar, Theme, createStyles, Typography, withStyles, WithStyles } from '@material-ui/core'


const styles = (theme: Theme) => createStyles({
  toolbar: {
    backgroundColor: theme.palette.primary.dark,
    ...theme.mixins.mainContent,
  },
})

const enhance = createComposer()
  .withDecorator(withBreadcrumbs([]))
  .withDecorator(withStyles(styles) as ComponentDecorator<{}, WithStyles<typeof styles>>)
  .build()

const BreadcrumbsToolbar = enhance(({ breadcrumbs, classes }) => {
  return (
    <Toolbar className={classes.toolbar}>
        <Typography variant="h6">{breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.key}>
        <NavLink to={breadcrumb.props.match.url}>
          {breadcrumb}
        </NavLink>
        {(index < breadcrumbs.length - 1) && <i> / </i>}
      </span>
    ))}</Typography>
      </Toolbar>
  )
})

export default BreadcrumbsToolbar