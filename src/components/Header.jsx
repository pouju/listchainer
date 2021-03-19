import React from 'react'
import { Typography, AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { mainColor } from '../utils'

const useStyles = makeStyles(() => ({
  header: {
    margin: '80px',
    display: 'flex',
    justifyContent: 'center'
  },
  appbar: {
    alignItems: 'center',
    position: 'fixed',
    background: mainColor,
    color: 'BLACK',
    height: '64px'
  },
  image: {
    marginRight: '20px'
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.header}>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <img className={classes.image} src='logo.png' height='64px' />
          <Typography variant="h4">
            ListChainer
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}


export default Header