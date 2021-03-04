import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  header: {
    margin: '50px',
    display: 'flex',
    justifyContent: 'center'
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.header}>
      <Typography variant="h2">
        ListChainer
      </Typography>
    </div>
  )
}


export default Header