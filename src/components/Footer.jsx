import React from 'react'
import { 
    AppBar,  
    Toolbar} from '@material-ui/core'; 
import BottomNavigation from './BottomNavigation'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  footer: {
    margin: '50px',
    display: 'flex',
    justifyContent: 'center'
  },
  appBar: { 
    top: 'auto', 
    position: 'fixed',
    bottom: 0,
    alignItems: 'center',
    background: 'GRAY'
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