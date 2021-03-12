import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import SettingsIcon from '@material-ui/icons/Settings'
import CreateIcon from '@material-ui/icons/Create'

const useStyles = makeStyles({
  root: {
    width: 500,
    background: '#DDFFF1'
  }
})

const LabelBottomNavigation = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState('home')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction component={Link} to="/" label="Home" value="home" icon={<HomeIcon />} />
      <BottomNavigationAction component={Link} to="/mylists" label="Mylists" value="mylists" icon={<CreateIcon />} />
      <BottomNavigationAction component={Link} to="/settings" label="Settings" value="settings" icon={<SettingsIcon />} />
    </BottomNavigation>
  )
}

export default LabelBottomNavigation