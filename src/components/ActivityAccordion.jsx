import React, { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core'
import { ExpandMore, Delete } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { generateColor } from '../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '70%',
    flexShrink: 0,
  },
  iconButton: {
    float: 'right',
  }
}))

const ActivityAccordion = ({ activity, activities, setActivities, selected, setSelected }) => {
  const [ newItem, setNewItem ] = useState('')
  const classes = useStyles()
  const backgroundColor = generateColor(activity.name, 100)

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

  const getItems = (
    Object.entries(activity.items)
      .map(([k, v]) => ({
        name: k,
        packs: v.packs
      }))
      .sort((a, b) => b.name > a.name ? 1 : -1)
  )

  const addItem = () => {
    event.preventDefault()
    if (!getItems.map(item => item.name).includes(newItem)) {
      activity.items[newItem] = { packs: 0 }
      setActivities({
        ...activities,
        activity
      })
      setNewItem('')
    }
  }

  const deleteItem = (item) => {
    delete activity.items[item.name]
    setActivities({
      ...activities,
      activity
    })
    console.log(item.name)
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
        <IconButton size='small' className={classes.iconButton} onClick={() => deleteItem(item)}>
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
    <Accordion style={{ backgroundColor }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
      >
        <Typography className={classes.heading}>{activity.name}</Typography>
        <Typography color='textSecondary'>
          {getItems.filter(item => selected.includes(item.name)).length} / {getItems.length} packed
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table>
          <TableBody>
            {getItems.map(buildRow)}
            <TableRow>
              <TableCell colSpan={3}>
                <form onSubmit={addItem}>
                  <TextField 
                    fullWidth 
                    placeholder='Add a new item...' 
                    error={getItems.map(item => item.name).includes(newItem)}
                    value={newItem}
                    onChange={(event) => setNewItem(event.target.value)} />
                </form>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  )
}

export default ActivityAccordion