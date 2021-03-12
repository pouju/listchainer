import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import ItemList from '../components/ItemList'
import SearchBar from '../components/SearchBar'
import presets from '../activities.json'

const useStyles = makeStyles(() => ({
  
}))

const comparator = (a, b) => a.name < b.name ? -1 : 1     // Sort alphabetically

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
    <div>
      <SearchBar 
        activities={activities} 
        selectedActivities={selectedActivities} 
        onChange={setSelectedActivities}
      />
      <ItemList 
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
