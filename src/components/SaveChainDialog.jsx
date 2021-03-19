import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const SaveChainDialog = ({ chainActivities, clear, showSuccess }) => {
  const [open, setOpen] = React.useState(false)
  const [ newChainName, setNewChainName ] = useState('')

  const saveCreatedChain = ( ) => {
    let chains = window.localStorage.getItem('cachedChains')
    chains = chains ? JSON.parse(chains) : { }

    // prevent overwrite
    if (chains[newChainName]) {
      return false
    }

    chains[newChainName] = {
      activities: Object.values(chainActivities),
      selectedItems: []
    }

    window.localStorage.setItem('cachedChains', JSON.stringify(chains))
    return true
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  // must create disabled alerts instead of using window alerts
  const handleClose = (bool) => {
    if (bool == true) {
      if (saveCreatedChain()) {
        clear()
        showSuccess()
      }
      else window.alert('Chain name reserved, chain names are unique')
    }
    else {
      setOpen(false)
    }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Save chain
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Save chain</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please give name for your new chain
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="newchainname"
            label='Chain name'
            type="text"
            fullWidth
            value={newChainName}
            onChange={(event) => setNewChainName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SaveChainDialog