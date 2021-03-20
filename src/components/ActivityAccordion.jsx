import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { generateColor } from '../utils'
import ItemList from './ItemList'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    flexShrink: 0,
    alignSelf: 'center',
    display: 'flex',
    marginRight: 20
  },
  secondaryHeading: {
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 20
  },
  iconButton: {
    float: 'right',
  },
  pinIcon: {
    marginRight: '10px'
  }
}))

const ActivityAccordion = ({ activity, activities, setActivities, selected, setSelected }) => {
  const classes = useStyles()
  const backgroundColor = generateColor(activity.name, false)
  const lighterBgColor  = generateColor(activity.name, true)

  const getItems = (
    Object.entries(activity.items)
      .map(([k, v]) => ({
        name: k,
        packs: v.packs
      }))
      .sort((a, b) => b.name < a.name ? 1 : -1)
  )

  return (
    <Accordion style={{ backgroundColor }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.heading}>
          {activity.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails style={{ backgroundColor: lighterBgColor }}>
        <ItemList
          activity={activity} 
          items={getItems}
          activities={activities}
          setActivities={setActivities}
          selected={selected}
          setSelected={setSelected}
        />
      </AccordionDetails>
    </Accordion>
  )
}

export default ActivityAccordion