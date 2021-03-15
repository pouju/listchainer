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

const ChainAccordion = ({ chain, handleDelete }) => {
  const classes = useStyles()
  const backgroundColor = generateColor(chain.name)

  const buildItemRow = (item, i) => (
    <TableRow
      hover
      tabIndex={-1}
      key={item[0]}
    >
      <TableCell>{item[0]}</TableCell>
    </TableRow>
  )

  const buildActivityAccordions = (activity, i) => {
    const backgroundColor = generateColor(activity.name)

    return (
      <TableRow
        hover
        tabIndex={-1}
        key={i}
      >
        <TableCell>    
          <Accordion style={{ backgroundColor }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography className={classes.heading}>{activity.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table size="small">
                <TableBody>{activity.items.map(buildItemRow)}</TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        </TableCell>
      </TableRow>
    )
  }
  
  return (
    <Accordion style={{ backgroundColor }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.heading}>{chain.name}</Typography>
        <Button variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>
      </AccordionSummary>
      <AccordionDetails>
        <Table size="small">
          <TableBody>{chain.activities.map(buildActivityAccordions)}</TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  )
}

export default ChainAccordion