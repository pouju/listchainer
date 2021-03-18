import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import SettingsIcon from '@material-ui/icons/Settings'
import CreateIcon from '@material-ui/icons/Create'
import CreateChain from '@material-ui/icons/PostAdd'
import { isTouchDevice } from '../utils'


const useStyles = makeStyles({
  root: {
    width: 700,
    background: '#7BFFBF'
  },
  rootTouch: {
    width: '100%',
    background: '#7BFFBF'
  }
})

const LabelBottomNavigation = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState('home')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <BottomNavigation value={value} onChange={handleChange} className={ isTouchDevice() ? classes.rootTouch : classes.root }>
      <BottomNavigationAction component={Link} to="/" label="Chains" value="home" icon={<HomeIcon />} />
      <BottomNavigationAction component={Link} to="/create-chains" label="New Chain" value="create" icon={<CreateChain />}/>
      <BottomNavigationAction component={Link} to="/settings" label="Settings" value="settings" icon={<SettingsIcon />} />
    </BottomNavigation>
  )
}

export default LabelBottomNavigation