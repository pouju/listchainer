import React from 'react'
import { Button, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const resetCache = () => window.localStorage.clear()

const Settings = () => {
  const classes = useStyles()

  return (
    <div >
      <Typography variant="h4">
        Settings Page
      </Typography>
      <Container className={classes.buttons}>
        <Button variant='contained' onClick={resetCache}>Reset all activities and lists</Button>
      </Container>
    </div>
  )
}

export default Settings