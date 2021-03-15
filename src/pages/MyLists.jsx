import { React, useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MylistSearchBar from '../components/MylistSearchBar'
import activities from '../activities.json'
import MyListsAccordion from '../components/MylistsAccordion'
import MovableItemList from '../components/MovableItemList'
import update from 'immutability-helper'

const useStyles = makeStyles(() => ({
  title: {
    marginBottom: 20
  }
}))

const getCachedLists = () => {
  const cache = window.localStorage.getItem('cachedMyActivities')

  return cache
    ? JSON.parse(cache)
    : []
}

const buildAccordions = ( myLists, handleDeleteList ) => {

  return (
    myLists
      .map((activity, i) => {
        const list = {
          name: activity,
          items: Object.entries(activities[activity].items)
        }
        return <MyListsAccordion key={`${activity}-dragdrop`} id={activity} list={list} handleDelete={() => handleDeleteList(activity)}></MyListsAccordion>
      })
  )
}

const Mylists = () => {
  const classes = useStyles()
  const [ mylists, setMylists ] = useState(getCachedLists())

  useEffect(() => {
    window.localStorage.setItem('cachedMyActivities', JSON.stringify(mylists))
  }, [ mylists ])


  // dnd, reorders mylists based on drag and drop
  const moveList = (dragIndex, hoverIndex) => {
    const draggedList = mylists[dragIndex]
    setMylists(
      update(mylists, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedList]]
      })
    )
  }

  const handleDeleteList = (deletedListName) => {
    if (deletedListName) {
      setMylists(mylists.filter( name => name != deletedListName))
    }
    
  }

  const handleAddList = (addedListName) => {
    if (addedListName)
      setMylists(mylists.concat(addedListName))
  }

  return (
    <div>
      <Typography className={classes.title} variant="h4" >
        My lists
      </Typography>
      {
        !mylists.length
          ? <Typography> You have no lists yet </Typography> 
          : <MovableItemList items={buildAccordions(mylists, handleDeleteList)} moveItem={moveList} />
      }
      <MylistSearchBar 
        lists={Object.entries(activities).map(([key, value]) => key).filter((name) => !mylists.includes(name))}
        onChange={handleAddList}
      />
    </div>
  )

}

export default Mylists

/* STORE HERE FOR REFERENCE DURING DEVELOPMENT

import { React, useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MylistSearchBar from '../components/MylistSearchBar'
import activities from '../activities.json'
import MyListsAccordion from '../components/MylistsAccordion'
import MovableItemList from '../components/MovableItemList'
import update from 'immutability-helper'

const useStyles = makeStyles(() => ({
  title: {
    marginBottom: 20
  }
}))

const getCachedLists = () => {
  const cache = window.localStorage.getItem('cachedMyLists')
  return cache
    ? JSON.parse(cache)
    : undefined
}

const buildAccordions = ( myLists, handleDeleteList ) => {
  return (
    myLists
      .map((list, i) => 
        <MyListsAccordion key={`${list.name}-dragdrop`} id={list.name} list={list} handleDelete={() => handleDeleteList(list.name)}></MyListsAccordion>
      )
  )
}

const Mylists = () => {
  const classes = useStyles()
  const [ mylists, setMylists ] = useState(getCachedLists() || [])

  useEffect(() => {
    window.localStorage.setItem('cachedMyLists', JSON.stringify(mylists))
  }, [ mylists ])


  // dnd, reorders mylists based on drag and drop
  const moveList = (dragIndex, hoverIndex) => {
    const draggedList = mylists[dragIndex]
    setMylists(
      update(mylists, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedList]]
      })
    )
  }

  const handleDeleteList = (deletedListName) => {
    setMylists(mylists.filter(list => list.name != deletedListName))
  }

  const handleAddList = (addedListName) => {
    const newListItem = activities
      .filter(list => (list.name == addedListName))[0]

    setMylists(mylists.concat(newListItem))
  }

  return (
    <div>
      <Typography className={classes.title} variant="h4" >
        My lists
      </Typography>
      {
        !mylists.length
          ? <Typography> You have no lists yet </Typography> 
          : <MovableItemList items={buildAccordions(mylists, handleDeleteList)} moveItem={moveList} />
      }
      <MylistSearchBar 
        lists={activities.filter(list => !mylists.includes(list))} 
        mylists={mylists} 
        onChange={handleAddList}
      />
    </div>
  )

}

export default Mylists
*/