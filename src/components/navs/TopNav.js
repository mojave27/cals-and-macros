import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from "@reach/router";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default function TopNav() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorEl2, setAnchorEl2] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const AdminMenu = () => {
    return (
    <React.Fragment>
      <Button
      aria-controls='simple-menu'
      aria-haspopup='true'
      onClick={handleClick}
      color="inherit"
    >
      admin
    </Button>
    <Menu
      id='admin-menu'
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <Link to="/manage-foods-db">{'foods db'}</Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link to="/manage-foods-db">{'meals db'}</Link>
      </MenuItem>
    </Menu> 
    </React.Fragment>
    )
  }

  const MealsMenu = () => {
    return (
    <React.Fragment>
      <Button
      aria-controls='simple-menu'
      aria-haspopup='true'
      onClick={handleClick}
      color="inherit"
    >
      meals
    </Button>
    <Menu
      id='meals-menu'
      anchorEl={anchorEl2}
      keepMounted
      open={Boolean(anchorEl2)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <Link to="/meals">{'view'}</Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link to="/meal">{'create'}</Link>
      </MenuItem>
    </Menu> 
    </React.Fragment>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar variant='dense'>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>

          <Button color='inherit' component={Link} to='/' >
            home
          </Button>

          {AdminMenu()}
          {MealsMenu()}

        </Toolbar>
      </AppBar>
    </div>
  )
}
