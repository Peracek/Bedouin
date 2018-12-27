import React from 'react'
import { Link, Route } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme, withStyles, Theme, WithStyles } from '@material-ui/core/styles'
// import { Mixins } from '@material-ui/core/styles/createMixins'
import { AppBar, Toolbar, Button, Typography, CssBaseline } from '@material-ui/core'

import routes from './routes'

import logo from '../bedouin.png'


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#e5a235',
      main: '#ffffff',
      dark: '#e1be4a',
      // contrastText?: string
    }
  },
  typography: {
    useNextVariants: true,
  },
  mixins: {
    mainContent: {
      paddingLeft: '50px',
      paddingRight: '50px'
    }
  }
})

const styles = (theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  logo: {
    height: '18px'
  },
  spacer: {
    width: '50px'
  },
  toolbar: theme.mixins.toolbar,
  content: theme.mixins.mainContent
})

const App = withStyles(styles)(({ classes }: WithStyles<typeof styles>) => (
  <div>
    <AppBar className={classes.appBar}>
      <Toolbar>
        <img src={logo} className={classes.logo} />
        <div className={classes.spacer}></div>
        <Button component={({ innerRef, ...props }) => <Link {...props} to="/templates" />}>Templates</Button>
        <Button component={({ innerRef, ...props }) => <Link {...props} to="/jobs" />}>Jobs</Button>
      </Toolbar>
    </AppBar>

    <div>
      <div className={classes.toolbar}></div>
      <Route {...routes.index} />
      <Route {...routes.templates} />
      <Route {...routes.templateDetail} />
      <Route {...routes.jobs} />
      <Route {...routes.jobDetail} />
    </div>
  </div>
))

export default () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>
)
