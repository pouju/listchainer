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
import { Delete, Add } from '@material-ui/icons'
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
  },
  addItemForm: {
    display: 'flex'
  }
}))


const ChainActivityItemListEdit = ({ activity, activities, setActivities, selectedItems, updateSelectedItems, chainName }) => {
  const [ newItem, setNewItem ] = useState('')
  const classes = useStyles()
  const newItemAlreadyExists = alreadyExists(newItem, activity.items.map(item => item[0]))
  const getAllItemNames = () => Object.values(activities).map(activity => Object.keys(activity.items)).flat().filter(name => name.toLowerCase().includes(newItem.toLowerCase()))

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
          <TableCell colSpan={3} >
            <form onSubmit={addItem} className={classes.addItemForm}>
              <Autocomplete
                style={{ width: '95%' }}
                freeSolo
                value={newItem}
                options={getAllItemNames()}
                onInputChange={(e, value) => setNewItem(value)}
                ListboxProps={{ style: { position: 'absolute', backgroundColor: '#fafafa', width: '100%' } }}
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
              <IconButton className={classes.iconButton} onClick={addItem}>
                <Add />
              </IconButton>
            </form> 
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default ChainActivityItemListEdit