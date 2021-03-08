import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Typography } from '@material-ui/core'


const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />)

const useStyles = makeStyles(( theme ) => ({
  packCount: {
    marginRight: '30px',
    display: 'flex',
  }
}))

const PackItem = ({ packs }) => {
  const [packed, setPack] = React.useState(false)
  const classes = useStyles()

  return (
    <FormControlLabel 
      control={<GreenCheckbox checked={packed.checked} onChange={() => setPack(!packed)} name="packed" />}
    />
  )
}

export default PackItem

