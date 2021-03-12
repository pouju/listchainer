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
    marginTop: 10
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

const ActivityList = ({ activities, setActivities, selectedActivities, selectedItems, setSelectedItems }) => {
  const classes = useStyles()

  const filterActivities = () => (
    Object.entries(activities)
      .filter(([name, v]) => selectedActivities.includes(name))
      .sort(([ak, av], [bk , bv]) => ak > bk ? 1 : -1)
      .sort(([ak, av], [bk , bv]) => bv.pinned - av.pinned)
      .map(([key, value]) => (
        {
          name: key,
          items: value.items,
          pinned: value.pinned
        }
      ))
  )

  return (
    <div className={classes.root}>
      {
        !selectedActivities.length
          ? <EmptyListText />
          : filterActivities()
            .map((activity, i) =>
              <ActivityAccordion 
                activity={activity} 
                activities={activities}
                setActivities={setActivities}
                selected={selectedItems} 
                setSelected={setSelectedItems}
                key={i} 
              />
            )
      }
    </div>
  )
}

export default ActivityList

