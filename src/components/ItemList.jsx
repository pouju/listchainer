import React, { useState } from 'react'
import { 
  Checkbox, 
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
  },
  pinIcon: {
    marginRight: '10px'
  }
}))


const ActivityContent = ({ activity, items, activities, setActivities, selected, setSelected }) => {
  const [ newItem, setNewItem ] = useState('')
  const classes = useStyles()

  const isSelected = (name) => selected.indexOf(name) !== -1

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }

  const addItem = (event) => {
    event.preventDefault()
    if (newItem && !items.map(item => item.name).includes(newItem)) {
      const newActivities = { ...activities }
      newActivities[activity.name].items[newItem] = { packs: 0 }
      setActivities(newActivities)
      setNewItem('')
    }
  }

  const deleteItem = (event, item) => {
    event.stopPropagation()
    const newActivities = { ...activities }
    delete newActivities[activity.name].items[item.name]
    setActivities(newActivities)
  }

  const buildRow = (item, i) => (
    <TableRow
      hover
      onClick={(event) => handleClick(event, item.name)}
      role="checkbox"
      aria-checked={isSelected(item.name)}
      tabIndex={-1}
      key={i}
      selected={isSelected(item.name)}
    >
      <TableCell>{item.name}</TableCell>
      {/* <TableCell>packed {item.packs} times</TableCell> */}
      <TableCell>
        <IconButton size='small' className={classes.iconButton} onClick={(event) => deleteItem(event, item)}>
          <Delete />
        </IconButton>
      </TableCell>
      <TableCell padding="checkbox">
        <Checkbox
          checked={isSelected(item.name)}
        />
      </TableCell>
    </TableRow>
  )

  return (
    <Table>
      <TableBody>
        {items.map(buildRow)}
        <TableRow>
          <TableCell colSpan={3}>
            <form onSubmit={addItem}>
              <TextField
                fullWidth 
                placeholder='Add a new item...' 
                error={items.map(item => item.name).includes(newItem)}
                value={newItem}
                onChange={(event) => setNewItem(event.target.value)} />
            </form>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default ActivityContent