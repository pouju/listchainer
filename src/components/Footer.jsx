import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import BottomNavigation from './BottomNavigation'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100px',
    
  },
  appBar: { 
    top: 'auto', 
    position: 'fixed',
    bottom: 0,
    alignItems: 'center',
    background: '#7BFFBF'
  }
}))

const Footer = () => {
  const classes = useStyles()
  
  return (
    <div className={classes.footer}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <BottomNavigation />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Footer