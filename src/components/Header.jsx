import React from 'react'
import { Typography, AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  header: {
    margin: '50px',
    display: 'flex',
    justifyContent: 'center'
  },
  appbar: {
    alignItems: 'center',
    position: 'top'
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.header}>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Typography variant="h4">
            Listchainer
          </Typography>
        </Toolbar>
      </AppBar>
    
    </div>
  )
}


export default Header