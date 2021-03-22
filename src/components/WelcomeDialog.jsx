import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justify: 'center',
    width: '100%'
  },
  imageDiv: {
    textAlign: 'center',
    margin: 100,
  },
  image: {
    width: '10%',
    height: 'auto',
    margin: 20
  },
  title: {
    textAlign: 'center'
  },
  button: {
    textAlign: 'center'
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} timeout={{ enter: 0, exit: 1000 }}/>
})

const getCachedWelcomeDialogValue = () => {
  const showOrNot = window.localStorage.getItem('cachedWelcomeDialogValue')
  console.log(showOrNot)
  if (!showOrNot || showOrNot === 'true') return true
  else return false
}

const  WelcomeDialog = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(getCachedWelcomeDialogValue())

  const handleClose = () => {
    setOpen(false)
    window.localStorage.setItem('cachedWelcomeDialogValue', 'false')
  }

  return (
    <div className={classes.root} >
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <div className={classes.imageDiv}>
          <Typography className={classes.title} variant='h2'>
            List
          </Typography>
          <img className={classes.image} src='logo.png' />
          <Typography className={classes.title} variant='h2'>
            Chainer
          </Typography>
        </div>
        <div className={classes.button}>
          <Button onClick={handleClose} variant="contained" >
            Start chaining your activities
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export default WelcomeDialog