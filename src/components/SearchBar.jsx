/* eslint-disable no-use-before-define */
import React from 'react'
import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import activities from '../activities.json'
import { generateColor } from '../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
    margin: 10
  },
}))

const SearchBar = ({ selected, onChange }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}> 
      <Autocomplete
        multiple
        id="tags-filled"
        options={activities.map((option) => option.name)}
        value={selected}
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