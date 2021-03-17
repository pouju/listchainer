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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '70%',
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


const ChainActivityItemListEdit = ({ activity, activities, setActivities, selectedItems, updateSelectedItems }) => {
  const [ newItem, setNewItem ] = useState('')
  const classes = useStyles()

  const addItem = (event) => {
    event.preventDefault()
    if (newItem && !activity.items.map(item => item.name).includes(newItem)) {
      const newActivities = { ...activities }
      newActivities[activity.name].items[newItem] = { packs: 0 }
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
      updateSelectedItems(selectedItems.filter(item => item !== itemName))
    }
  }

  const buildRow = (item, i) => (
    <TableRow
      hover
      tabIndex={-1}
      key={i}
    >
      <TableCell>{item[0]}</TableCell>
      {/* <TableCell>packed {item.packs} times</TableCell> */}
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
              <TextField
                fullWidth 
                placeholder='Add a new item...' 
                error={activity.items.map(item => item.name).includes(newItem)}
                value={newItem}
                onChange={(event) => setNewItem(event.target.value)} />
            </form>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default ChainActivityItemListEdit