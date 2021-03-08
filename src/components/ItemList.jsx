import React from 'react'
import {
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ActivityAccordion from './ActivityAccordion'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50
  },
  text: {
    alignSelf: 'center'
  }
}))

const EmptyListText = () => {
  const classes = useStyles()
  return (
    <Typography variant="h4" className={classes.text}>
      No items
    </Typography>
  )
}

const ItemList = ({ activities, selectedActivities, selectedItems, setSelectedItems }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {
        !selectedActivities.length
          ? <EmptyListText />
          : activities
            .filter(activity => selectedActivities.includes(activity.name))
            .map((activity, i) =>
              <ActivityAccordion activity={activity} key={i} selected={selectedItems} setSelected={setSelectedItems} />
            )
      }
    </div>
  )
}

export default ItemList

