import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import ItemList from './components/ItemList'
import SearchBar from './components/SearchBar'
import Footer from './components/Footer'
import { makeStyles } from '@material-ui/styles'
import {
  Container
} from '@material-ui/core'
import presets from './activities.json'

const useStyles = makeStyles(() => ({
  root: {
  }
}))

const comparator = (a, b) => a.name < b.name ? -1 : 1     // Sort alphabetically

const getCachedActivities = () => {
  const cache = window.localStorage.getItem('cachedActivities')
  return cache
    ? JSON.parse(cache).sort(comparator)
    : undefined
}

const App = () => {
  const classes = useStyles()
  const [ activities, setActivities ] = useState(getCachedActivities() || presets.sort(comparator))
  const [ selectedActivities, setSelectedActivities ] = useState([])
  const [ selectedItems, setSelectedItems ] = useState([])

  useEffect(() => {
    window.localStorage.setItem('cachedActivities', JSON.stringify(activities))
  }, [ activities ])

  return (
    <div className={classes.root}>
      <Container>
        <Header />
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
        <Footer />
      </Container>
    </div>
  )
}

export default App
