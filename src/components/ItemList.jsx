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
import { alreadyExists, isValidName } from '../utils'

const useStyles = makeStyles((theme) => ({
  iconButton: {
    float: 'right',
    marginLeft: 'auto'
  },
  favoriteIcon: {
    marginRight: '10px'
  }
}))

const Item = ({ name, onDelete }) => {
  const classes = useStyles()

  return (
    <TableRow tabIndex={-1}>
      <TableCell>{name}</TableCell>
      <TableCell>
        <IconButton className={classes.iconButton} onClick={(event) => onDelete(event, name)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

const ActivityContent = ({ activity, items, activities, setActivities }) => {
  const [ newItem, setNewItem ] = useState('')
  const newItemAlreadyExists = alreadyExists(newItem, items.map(item => item.name))

  const addItem = (event) => {
    event.preventDefault()
    if (isValidName(newItem) && !newItemAlreadyExists) {
      const newActivities = { ...activities }
      newActivities[activity.name].items[newItem.trim()] = { packs: 0 }
      setActivities(newActivities)
      setNewItem('')
    }
  }

  const deleteItem = (event, name) => {
    event.stopPropagation()
    const newActivities = { ...activities }
    delete newActivities[activity.name].items[name]
    setActivities(newActivities)
  }

  return (
    <Table>
      <TableBody>
        {items.map((item, i) => (
          <Item name={item.name} onDelete={deleteItem} key={i} />
        ))}
        <TableRow>
          <TableCell colSpan={3}>
            <form onSubmit={addItem}>
              <TextField
                fullWidth 
                placeholder='Add a new item...' 
                error={newItemAlreadyExists}
                value={newItem}
                helperText={newItemAlreadyExists ? 'Item already exists!' : ''}
                onChange={(event) => setNewItem(event.target.value)} />
            </form>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default ActivityContent