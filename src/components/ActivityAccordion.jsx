import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { generateColor } from '../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '70%',
    flexShrink: 0,
  }
}))

const ActivityAccordion = ({ activity, activities, setActivities, selected, setSelected }) => {
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

  const buildRow = (item, i) => (
    <TableRow
      hover
      onClick={(event) => handleClick(event, item.name)}
      role="checkbox"
      aria-checked={isSelected(item.name)}
      tabIndex={-1}
      key={item.name}
      selected={isSelected(item.name)}
    >
      <TableCell>{item.name}</TableCell>
      {/* <TableCell>packed {item.packs} times</TableCell> */}
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
          {activity.items.filter(item => selected.includes(item.name)).length} / {activity.items.length} packed
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table>
          <TableBody>{activity.items.map(buildRow)}</TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  )
}

export default ActivityAccordion