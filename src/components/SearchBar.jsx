/* eslint-disable no-use-before-define */
import React from 'react'
import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { generateColor } from '../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
    margin: 10
  },
}))

const SearchBar = ({ activities, selectedActivities, onChange }) => {
  const classes = useStyles()

  const activityNames = () => (
    Object.entries(activities)
      .sort(([ak, av], [bk , bv]) => ak > bk ? 1 : -1)
      .sort(([ak, av], [bk , bv]) => bv.pinned - av.pinned)
      .map(([key, value]) => key)
  )

  return (
    <div className={classes.root}> 
      <Autocomplete
        multiple
        id="tags-filled"
        options={activityNames()}
        value={selectedActivities}
        onChange={(e, v) => onChange(v)}
        freeSolo
        filterSelectedOptions
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip 
              variant="outlined" 
              label={option} {...getTagProps({ index })} 
              style={{ backgroundColor: generateColor(option, 100) }} 
              key={index}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Activities" placeholder="Search for activities" />
        )}
      />
    </div>
  )
}

export default SearchBar