import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import ActivityList from '../components/ActivityList'
import SearchBar from '../components/SearchBar'
import SaveChainDialog from '../components/SaveChainDialog'
import { Button, Tooltip, Typography } from '@material-ui/core'
import CreateAlert from '../components/Alert'
import { getCachedActivities } from '../utils'
import { Help } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  saveChain: {
    marginTop: 10
  },
  info: {
    marginLeft: 10,
  }
}))

const CreateChains = () => {
  const classes = useStyles()
  const [ activities, setActivities ] = useState(getCachedActivities())
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

  const infoText = 
    `Start typing to get suggestions or create a new activity by typing a name and pressing Enter.
    You can pin activities to the top of the list by pressing the heart button and delete activities
    by pressing the trash can button. Note that you can't delete activities that are part of a chain.`

  return (
    <div className={classes.root}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Create new chain
        <Tooltip color='secondary' className={classes.info} title={infoText}>
          <Help />
        </Tooltip>
      </Typography>
      
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
            ? <Button disabled>Save Chain</Button>
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

export default CreateChains


