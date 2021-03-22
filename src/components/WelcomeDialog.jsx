import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
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
    margin: 50,
    marginTop: 100
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
    textAlign: 'center',
    marginBottom: 100
  },
  info: {
    margin: 20
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

const  WelcomeDialog = ({ forceOpen, close }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState( forceOpen ? true : getCachedWelcomeDialogValue() )

  const handleClose = () => {
    setOpen(false)
    window.localStorage.setItem('cachedWelcomeDialogValue', 'false')

    if (close) close()
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
        <div className={classes.info}>
          <h3>Heya! 👋</h3>
          <h4>Welcome to ListChainer - your own little pocket assistant that keeps track of the items you need in your daily activities.</h4>
          <h4>To get you started, here’s a mini glossary of some useful Listchainer lingo 💬</h4>
          <p>
              🤸‍♂️ An Activity simply means the stuff you do every day - be it studying, skydiving,
              knitting, swimming, reading, going to the movies, stargazing… You name it! In ListChainer,
              you can define the items you need to pack along for your activity. We’ve added a bunch of
              ready-made editable lists for you, but you could and should create your own activities in
              the “Create a New Chain” -section. You can later on edit the items both in “Create a New Chain”
              as well as “My Chains”.
          </p>
          <p>
              ✔️ Exercise 1: Create a new Activity called “Clubbing”. You can for instance add the following items:
              Wallet, ID Card, Bottle of “water”, Party outfit and Dance skills. Let’s go!
          </p>
          <br/>
          <p>
              ⛓ A Chain is a collection of your daily activities. Say, for example, during your typical day you’d go to work,
              hit the gym and finish off the day at the pub. Your chain “My Typical Day 1” would then be Work → Gym → Pub.
              You can create your own chain in the “Create a New Chain” -section. You can see a collection of your own chains
              under “My Chains” -section.
          </p>
          <p>
              ✔️ Exercise 2: Create your first chain! To do this, in the “Create a New Chain” -section, just start typing the
              Activities you wish to include (and no worries, you may edit the items of each Activity on the go). How about a chain
              called “Off Day” with the Activities “Climbing”, “Grocery shopping”, “Movies” and “Clubbing”?
          </p>
          <br/>
          <p>
              That’s it - thanks for your attention. You may now play around with the app to get in grips with all the functionalities
              and customize your own ListChainer experience. You can revisit this tutorial any time under “Settings”. ✨
          </p>
          <p>
              💌 We’re still in an early phase of production. If you wanna reach out to us in person to ask us a question,
              report a bug, request functionalities or just say hello to our wonderful team, please don’t hesitate to contact us at:
              listchainerteam@gmail.com
          </p>

          <h2>Happy listing!</h2>
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