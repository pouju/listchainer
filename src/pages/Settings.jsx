import React, { useState } from 'react'
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Alert from '../components/Alert'

const useStyles = makeStyles(() => ({
  title: {
    paddingBottom: '40px'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  }
}))

const ResetConfirmationDialog = ({ open, action, cancel }) => (
  <Dialog open={open} onClose={cancel}>
    <DialogTitle>Are you sure?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        This will clear all your changes and load preset activities.
        Do you want to continue?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={cancel}>No</Button>
      <Button onClick={action}>Yes</Button>
    </DialogActions>
  </Dialog>
)

const Settings = () => {
  const classes = useStyles()
  const [ showAlert, setShowAlert ] = useState(false)
  const [ dialogOpen, setDialogOpen ] = useState(false)

  const resetCache = () => {
    window.localStorage.clear()
    setDialogOpen(false)
    setShowAlert(true)
  }

  return (
    <div>
      <Typography variant="h4" className={classes.title}>
        Settings
      </Typography>
      <Container className={classes.buttons}>
        <Button variant='contained' onClick={() => setDialogOpen(true)}>
          Reset all chains and activities
        </Button>
      </Container>

      {
        showAlert
          ? <Alert message={'Erased all changes'} hideAlert={() => setShowAlert(false)} />
          : <></>
      }

      <ResetConfirmationDialog 
        open={dialogOpen} 
        action={resetCache}
        cancel={() => setDialogOpen(false)}
      />
    </div>
  )
}

export default Settings