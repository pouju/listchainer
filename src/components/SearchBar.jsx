/* eslint-disable no-use-before-define */
import React from 'react'
import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { generateColor } from '../utils'
import { IconButton } from '@material-ui/core'
import { Delete, Favorite, FavoriteBorder } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  leftMostIcon: {
    marginLeft: 'auto'
  },
  pinIcon: {
    marginLeft: 0,
    marginRight: '5px'
  }
}))

const SearchBar = ({ activities, setActivities, selectedActivities, setSelectedActivities }) => {
  const classes = useStyles()

  const activityNames = (
    Object.entries(activities)
      .sort(([ak, av], [bk , bv]) => ak.toLowerCase() > bk.toLowerCase() ? 1 : -1)
      .sort(([ak, av], [bk , bv]) => bv.pinned - av.pinned)
      .map(([key, value]) => key)
  )

  const onChange = (event, value) => {
    const newestItem = value[value.length - 1]
    const wasAddition = value.length > selectedActivities.length
    if (wasAddition && !activities[newestItem]) createActivity(newestItem)
    setSelectedActivities(value)
  }

  const createActivity = (name) => {
    const newActivities = { ...activities }
    newActivities[name] = {
      items: {},
      pinned: false
    }
    setActivities(newActivities)
    console.log('created',name)
  }

  const deleteActivity = (event, name) => {
    event.stopPropagation()
    const newActivities = { ...activities }
    delete newActivities[name]
    setActivities(newActivities)
  }

  const toggleFavorite = (event, name) => {
    event.stopPropagation()
    const newActivities = { ...activities }
    newActivities[name].pinned = !newActivities[name].pinned
    setActivities(newActivities)
  }

  const renderOption = (option) => (
    <>
      {option}
      <IconButton 
        className={classes.leftMostIcon}
        onClick={(event) => toggleFavorite(event, option)}>
        {activities[option].pinned ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
      <IconButton onClick={(event) => deleteActivity(event, option)}>
        <Delete />
      </IconButton>
    </>
  )

  return (
    <div className={classes.root}> 
      <Autocomplete
        multiple
        id="tags-filled"
        options={activityNames}
        value={selectedActivities}
        onChange={onChange}
        freeSolo
        filterSelectedOptions
        renderOption={renderOption}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip 
              variant="outlined" 
              label={option} {...getTagProps({ index })} 
              style={{ backgroundColor: generateColor(option, false) }} 
              key={index}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Activities" placeholder="Search or create new activities..." />
        )}
      />
    </div>
  )
}

export default SearchBar