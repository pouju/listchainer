import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import ActivityList from '../components/ActivityList'
import SearchBar from '../components/SearchBar'
import presets from '../activities.json'
import SaveChainDialog from '../components/SaveChainDialog'
import { Typography } from '@material-ui/core'
import CreateAlert from '../components/Alert'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  saveChain: {
    marginTop: 10
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
  const [ showAlert, setShowAlert ] = useState(false)

  useEffect(() => {
    window.localStorage.setItem('cachedActivities', JSON.stringify(activities))
  }, [ activities ])

  const clear = () => {
    setSelectedActivities([])
    setSelectedItems([])
  }

  const toggleShowAlert = () => {
    setShowAlert(!showAlert)
  }

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
      {
        showAlert
          ? <CreateAlert message={'Chain saved'} hideAlert={toggleShowAlert} />
          : <></>
      }
      <div className={classes.saveChain}>
        {
          !selectedActivities.length
            ? <Typography>Select activities to save them to chain</Typography>
            : 
            <SaveChainDialog
              chainActivities={selectedActivities}
              clear={clear}
              showSuccess={toggleShowAlert}
            />
        }
      </div>
    </div>
  )
}

export default Home


