import React, { useState } from 'react'
import { Typography, AppBar, Toolbar, IconButton } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import { makeStyles } from '@material-ui/styles'
import { mainColor } from '../utils'
import WelcomeDialog from './WelcomeDialog'

const useStyles = makeStyles(() => ({
  header: {
    margin: '80px',
    display: 'flex',
    justifyContent: 'center'
  },
  appbar: {
    position: 'fixed',
    background: mainColor,
    color: 'BLACK',
    height: '64px',
    alignItems: 'center'
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  },
  image: {
    marginRight: '20px'
  },
  helpIcon: {
    marginLeft: '20px'
  }
}))

const Header = () => {
  const classes = useStyles()
  const [showHelp, setShowHelp ] = useState(false)

  return (
    <div className={classes.header}>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <div className={classes.title}>
            <img className={classes.image} src='logo.png' height='64px' />
            <Typography variant="h4">
              ListChainer
            </Typography>
          </div>
          <div className={classes.helpIcon}>
            <IconButton onClick={() => setShowHelp(true)} >
              <HelpIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {
        showHelp
          ? <WelcomeDialog forceOpen={true} close={() => setShowHelp(false)} />
          : <></>
      }
    </div>
    
  )
}


export default Header