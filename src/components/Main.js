import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import { Link as RouterLink } from '@reach/router'

const drawerWidth = 175

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

function ListItemLink(props) {
  const { icon, primary, to } = props

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  )

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

const Main = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List
            subheader={
              <ListSubheader component='div' id='nested-list-subheader'>
                meals
              </ListSubheader>
            }
          >
            <ListItemLink
              to='/meals'
              primary='view meals'
              // icon={<InboxIcon />}
            />
            <ListItemLink
              to='/meal'
              primary='create meal'
              // icon={<InboxIcon />}
            />
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader component='div' id='nested-list-subheader'>
                admin
              </ListSubheader>
            }
          >
            <ListItemLink
              to='/manage-foods-db'
              primary='foods db'
              // icon={<BuildIcon />}
            />
            <ListItemLink
              to='/manage-foods-db'
              primary='meals db'
              // icon={<InboxIcon />}
            />
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        {/* toolbar is used for spacing - to push content down */}
        <Toolbar />
        {props.children}
      </main>
    </div>
  )
}

export default Main
