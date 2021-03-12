import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import ActivityList from '../components/ActivityList'
import SearchBar from '../components/SearchBar'
import presets from '../activities.json'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

const getCachedActivities = () => {
  const cache = window.localStorage.getItem('cachedActivities')

  return cache
    ? JSON.parse(cache)
    : undefined
}

const Home = () => {
  const classes = useStyles()
  const [ activities, setActivities ] = useState(getCachedActivities() || presets)
  const [ selectedActivities, setSelectedActivities ] = useState([])
  const [ selectedItems, setSelectedItems ] = useState([])

  useEffect(() => {
    window.localStorage.setItem('cachedActivities', JSON.stringify(activities))
  }, [ activities ])

  return (
    <div className={classes.root}>
      <SearchBar 
        activities={activities} 
        setActivities={setActivities}
        selectedActivities={selectedActivities} 
        setSelectedActivities={setSelectedActivities}
      />
      <ActivityList 
        activities={activities} 
        setActivities={setActivities}
        selectedActivities={selectedActivities}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  )
}

export default Home
