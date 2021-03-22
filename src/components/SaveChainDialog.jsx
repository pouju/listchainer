import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const SaveChainDialog = ({ chainActivities, clear, showSuccess }) => {
  const [ open, setOpen ] = React.useState(false)
  const [ newChainName, setNewChainName ] = useState('')

  let chains = window.localStorage.getItem('cachedChains')
  chains = chains ? JSON.parse(chains) : { }

  const chainExists = () => chains[newChainName] ? true : false

  const saveChain = () => {
    chains[newChainName] = {
      activities: Object.values(chainActivities),
      selectedItems: []
    }
    window.localStorage.setItem('cachedChains', JSON.stringify(chains))
  }

  const handleClose = (confirm) => {
    if (confirm) {
      saveChain()
      clear()
      showSuccess()
      setNewChainName('')
      setOpen(false)
    }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
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
            error={chainExists()}
            helperText={chainExists() ? 'Chain already exists!' : ''}
            value={newChainName}
            onChange={(event) => setNewChainName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button disabled={!newChainName} onClick={() => handleClose(true)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SaveChainDialog