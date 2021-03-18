import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import { green } from '@material-ui/core/colors'
import ChainAccordion from '../components/ChainAccordion'
import MovableItemList from '../components/MovableItemList'
import update from 'immutability-helper'
import {
  IconButton,
  Typography
} from '@material-ui/core'
import presets from '../activities.json'
import testChains from '../chains.json'
import { ToggleOff, ToggleOn, Add } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  orderBar: {
    marginLeft: 'auto'
  },
  heading: {
    flexBasis: '80%',
    flexShrink: 0,
  }
}))

const getCachedActivities = () => {
  const cache = window.localStorage.getItem('cachedActivities')

  return cache
    ? JSON.parse(cache)
    : presets
}

const getCachedChains = () => {
  const cache = window.localStorage.getItem('cachedChains')

  return cache
    ? Object.entries(JSON.parse(cache))
    : [] // Object.entries(testChains)
}

const buildChainAccordions = ( chains, activities, setActivities, deleteChain, updateSelectedItems, chainsInEdit, setChainsInEdit, deleteActivityInChain, addActivityToChain ) => {

  const chainsO = chains
    .map(([chainName, data]) => {
      return {
        name: chainName,
        activities: data.activities.map(activity => {
          return {
            name: activity,
            items: Object.entries(activities[activity].items)
          }
        }),
        selectedItems: data.selectedItems
      }
    })

  return (
    chainsO
      .map((chain, i) => {
        return (
          <ChainAccordion 
            key={`${chain.name}-chainaccordion`}
            id={chain.name}
            chain={chain}
            handleDelete={() => deleteChain(chain.name)}
            updateSelectedItems={updateSelectedItems}
            chainsInEdit={chainsInEdit}
            setChainsInEdit={setChainsInEdit}
            deleteActivityInChain={deleteActivityInChain}
            activities={activities}
            setActivities={setActivities}
            addActivityToChain={addActivityToChain}
          />
        )
      })
  )
}

const Chains = () => {
  const classes = useStyles()
  const [ chains, setChains ] = useState(getCachedChains())
  const [ activities, setActivities ] = useState(getCachedActivities())
  const [ chainsInEdit, setChainsInEdit ] = useState([])
  const [ dragAllowed, setDragAllowed ] = useState(false)
   
  useEffect(() => {
    window.localStorage.setItem('cachedActivities', JSON.stringify(activities))
  }, [ activities ])

  useEffect(() => {
    window.localStorage.setItem('cachedChains', JSON.stringify(Object.fromEntries(chains)))
  }, [ chains ])

  const moveChain = (dragIndex, hoverIndex) => {
    const draggedChain = chains[dragIndex]
    setChains(
      update(chains, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedChain]]
      })
    )
  }

  const deleteChain = (chainName) => {
    if (chainName) {
      setChains(chains.filter(([name, _]) => name != chainName))
      if (chainsInEdit.includes(chainName)) {
        setChainsInEdit(chainsInEdit.filter(chain => chain !== chainName))
      }
    }
  }

  const updateSelectedItems = (chainName, selectedItems) => {
    const newChains = Object.fromEntries(chains)
    newChains[chainName].selectedItems = selectedItems
    setChains(Object.entries(newChains))
  }

  const deleteActivityInChain = (chainName, deletedActivity) => {
    const newChains = Object.fromEntries(chains)
    newChains[chainName].activities = newChains[chainName].activities.filter(activity => activity !== deletedActivity)
    setChains(Object.entries(newChains))
  }

  const addActivityToChain = (chainName, activityName) => {
    const addedActivity = activities[activityName]

    // create activity ih not exists
    if (!addedActivity) {
      const newActivities = { ...activities }
      newActivities[activityName] = {
        items: {},
        pinned: false
      }
      setActivities(newActivities)
    }

    // add activity to chain
    const newChains = Object.fromEntries(chains)
    newChains[chainName].activities.push(activityName)
    setChains(Object.entries(newChains))
  }
  
  const toggleDragAllowed = () => {
    setDragAllowed(!dragAllowed)
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.heading} >
        Your chains
      </Typography>
      <div className={classes.orderBar}>
      
        {
          dragAllowed 
            ?
            <IconButton onClick={toggleDragAllowed}>
              <ToggleOn fontSize='large' color="primary"/> reorder on
            </IconButton>
            :
            <IconButton onClick={toggleDragAllowed}>
              <ToggleOff fontSize='large' /> reorder off
            </IconButton>
        }
        <Link to='/create-chains'>
          <IconButton >
            <Add fontSize='large' style={{ color: green[500] }} />
          </IconButton>
        </Link>
      </div>
      
      {
        !chains.length
          ? <Typography> You have no chains yet. You can create chains in create page </Typography> 
          : <MovableItemList items={buildChainAccordions(chains, activities, setActivities, deleteChain, updateSelectedItems, chainsInEdit, setChainsInEdit, deleteActivityInChain, addActivityToChain )} moveItem={moveChain} dragAllowed={dragAllowed} />
      }

      
    </div>
  )
}

export default Chains