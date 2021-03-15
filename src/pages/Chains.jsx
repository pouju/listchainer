import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import ChainAccordion from '../components/ChainAccordion'
import MovableItemList from '../components/MovableItemList'
import update from 'immutability-helper'
import {
  Typography
} from '@material-ui/core'
import presets from '../activities.json'
import testChains from '../chains.json'

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
    : presets
}

const getCachedChains = () => {
  const cache = window.localStorage.getItem('cachedChains')

  return cache
    ? Object.entries(JSON.parse(cache))
    : [] //Object.entries(testChains) 
}

const buildChainAccordions = ( chains, activities, deleteChain ) => {

  const chainsO = chains
    .map(([chainName, activityNames]) => {
      return {
        name: chainName,
        activities: activityNames.activities.map(activityName => {
          return {
            name: activityName,
            items: Object.entries(activities[activityName].items)
          }
        })
      }
    })

  return (
    chainsO
      .map((chain, i) => {
        return <ChainAccordion key={`${chain.name}-chainaccordion`} id={chain.name} chain={chain} handleDelete={() => deleteChain(chain.name)}></ChainAccordion>
      })
  )
}

const Chains = () => {
  const classes = useStyles()
  const [ chains, setChains ] = useState(getCachedChains())
  const [ activities, setActivities ] = useState(getCachedActivities())

  
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
    }
  }

  const margin = 10

  return (
    <div className={classes.root}>
      <Typography variant="h4" >
        My chains
      </Typography>
      {
        !chains.length
          ? <Typography> You have no chains yet </Typography> 
          : <MovableItemList items={buildChainAccordions(chains, activities, deleteChain)} moveItem={moveChain} />
      }

      
    </div>
  )
}

export default Chains