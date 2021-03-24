import React, { useState } from 'react'
import { 
  IconButton, 
  makeStyles, 
  Table, 
  TableBody, 
  TableCell, 
  TableRow, 
  TextField 
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { alreadyExists, isValidName } from '../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '50%',
    flexShrink: 0,
    alignSelf: 'center',
    display: 'flex'
  },
  secondaryHeading: {
    alignSelf: 'center'
  },
  iconButton: {
    float: 'right',
    marginLeft: 'auto'
  }
}))


const ChainActivityItemListEdit = ({ activity, activities, setActivities, selectedItems, updateSelectedItems, chainName }) => {
  const [ newItem, setNewItem ] = useState('')
  const classes = useStyles()
  const newItemAlreadyExists = alreadyExists(newItem, activity.items.map(item => item[0]))
  const getAllItemNames = () => [...new Set(Object.values(activities).map(activity => Object.keys(activity.items)).flat())]

  const addItem = (event) => {
    event.preventDefault()
    if (isValidName(newItem) && !newItemAlreadyExists) {
      const newActivities = { ...activities }
      newActivities[activity.name].items[newItem.trim()] = { packs: 0 }
      setActivities(newActivities)
      setNewItem('')
    }
  }

  const deleteItem = (event, itemName) => {
    event.stopPropagation()
    const newActivities = { ...activities }
    delete newActivities[activity.name].items[itemName]
    setActivities(newActivities)

    if (selectedItems.includes(itemName)) {
      console.log(selectedItems)
      console.log(selectedItems.filter(item => item !== itemName))
      updateSelectedItems(chainName, selectedItems.filter(item => item !== itemName))
    }
  }

  const buildRow = (item, i) => (
    <TableRow
      hover
      tabIndex={-1}
      key={i}
    >
      <TableCell>{item[0]}</TableCell>
      <TableCell>
        <IconButton className={classes.iconButton} onClick={(event) => deleteItem(event, item[0])}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  )

  return (
    <Table>
      <TableBody>
        {activity.items.map(buildRow)}
        <TableRow>
          <TableCell colSpan={3}>
            <form onSubmit={addItem}>
              <Autocomplete
                freeSolo
                value={newItem}
                options={getAllItemNames()}
                onChange={(e, value) => setNewItem(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth 
                    placeholder='Add a new item...' 
                    error={newItemAlreadyExists}
                    helperText={newItemAlreadyExists ? 'Item already exists!' : ''} 
                  />
                )}
              />
            </form>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default ChainActivityItemListEdit