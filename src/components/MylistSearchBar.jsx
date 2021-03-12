import React from 'react'
import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { generateColor } from '../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
    margin: 10
  },
}))

const MylistSearchBar = ({ lists, onChange }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}> 
      <Autocomplete
        id="mylistselection"
        options={lists}
        onChange={(e, v) => onChange(v)}
        //freeSolo
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params}
            variant="outlined"
            label="Add list"
            placeholder="Start typing to add new..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              )
            }}
          />
        )}
      />
    </div>
  )
}

export default MylistSearchBar