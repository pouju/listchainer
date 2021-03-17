import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const CreateAlert = ({ message, isError, hideAlert }) => {
  const classes = useStyles()

  setTimeout(hideAlert, 5000)

  return (
    <div className={classes.root}>
      {
        isError
          ? <Alert severity="error">{ message }</Alert>
          : <Alert severity="success">{ message }</Alert>
      }
    </div>
  )
}

export default CreateAlert