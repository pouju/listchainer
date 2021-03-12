import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import PinIcon from 'mdi-react/PinIcon'
import PinOutlineIcon from 'mdi-react/PinOutlineIcon'
import PinOffIcon from 'mdi-react/PinOffIcon'
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
  const backgroundColor = generateColor(activity.name)

  const getItems = (
    Object.entries(activity.items)
      .map(([k, v]) => ({
        name: k,
        packs: v.packs
      }))
      .sort((a, b) => b.name < a.name ? 1 : -1)
  )

  const togglePin = (event, name) => {
    event.stopPropagation()
    const newActivities = { ...activities }
    newActivities[name].pinned = !newActivities[name].pinned
    setActivities(newActivities)
  }

  return (
    <Accordion style={{ backgroundColor }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.heading}>
          {activity.pinned ? <PinIcon className={classes.pinIcon}/> : <></>}
          {activity.name}
        </Typography>
        <Typography color='textSecondary' className={classes.secondaryHeading}>
          {getItems.filter(item => selected.includes(item.name)).length} / {getItems.length} packed
        </Typography>
        <IconButton 
          className={classes.iconButton} 
          onClick={(event) => togglePin(event, activity.name)}
        >
          {activity.pinned ? <PinOffIcon /> : <PinOutlineIcon />}
        </IconButton>
      </AccordionSummary>
      <AccordionDetails>
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