import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import SettingsIcon from '@material-ui/icons/Settings'
import CreateChain from '@material-ui/icons/PostAdd'
import { isTouchDevice, mainColor } from '../utils'


const useStyles = makeStyles({
  root: {
    width: 700,
    background: mainColor
  },
  rootTouch: {
    width: '100%',
    background: mainColor
  }
})

const LabelBottomNavigation = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(window.location.hash)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <BottomNavigation value={value} onChange={handleChange} className={ isTouchDevice() ? classes.rootTouch : classes.root }>
      <BottomNavigationAction component={NavLink} to="/" label="Chains" value="#/" icon={<HomeIcon />} />
      <BottomNavigationAction component={NavLink} to="/create-chains" label="New Chain" value="#/create-chains" icon={<CreateChain />}/>
      <BottomNavigationAction component={NavLink} to="/settings" label="Settings" value="#/settings" icon={<SettingsIcon />} />
    </BottomNavigation>
  )
}

export default LabelBottomNavigation