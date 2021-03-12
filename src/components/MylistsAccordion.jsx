import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
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

const MyListsAccordion = ({ list, handleDelete }) => {
  const classes = useStyles()
  const backgroundColor = generateColor(list.name, 100)

  const buildRow = (item, i) => (
    <TableRow
      hover
      tabIndex={-1}
      key={item[0]}
    >
      <TableCell>{item[0]}</TableCell>
    </TableRow>
  )
  
  return (
    <Accordion style={{ backgroundColor }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.heading}>{list.name}</Typography>
        <Button variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>
      </AccordionSummary>
      <AccordionDetails>
        <Table size="small">
          <TableBody>{list.items.map(buildRow)}</TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  )
}

export default MyListsAccordion