import React from 'react'
import { Link, Route } from 'react-router-dom'
import { mapValues } from 'lodash'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles'

import routes from './routes'


const drawerWidth = 240

const styles = (theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    paddingLeft: drawerWidth
  }
})

class App extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props

    return (
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              No mad
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open variant="permanent" className={classes.drawer} classes={{paper: classes.drawerPaper}}>
          <div className={classes.toolbar}></div>
          <Link to="/templates">Templates</Link>
          <Link to="/jobs">Jobs</Link>
        </Drawer>

        <div className={classes.content}>
          <div className={classes.toolbar}></div>
          <Route {...routes.index} />
          <Route {...routes.templates} />
          <Route {...routes.templateDetail} />
          <Route {...routes.jobs} />
          <Route {...routes.jobDetail} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(App)
