import React from 'react'
import ItemCard from './ItemCard'
import activities from '../activities.json'
import {
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { generateColor } from '../utils'

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

const ItemList = ({ selected }) => {
  const classes = useStyles()

  const selectedActivities = activities.filter(activity => selected.includes(activity.name))
  const items = []
  const compare = (a, b) => b.packs - a.packs

  selectedActivities.forEach(activity => {
    const bgColor = generateColor(activity.name, 50)

    activity.items.forEach(item => {
      const duplicate = 
        items.findIndex(existingItem => item.name === existingItem.name)

      if (duplicate !== -1) {
        items[duplicate].packs += item.packs
        items[duplicate].foundIn.push(activity.name)
      } else {
        items.push({
          ...item,
          bgColor,
          foundIn: [ activity.name ]
        })
      }
    })
  })

  return (
    <div className={classes.root}>
      {
        !items.length
        ? <EmptyListText />
        : items.sort(compare).map((item, i) => (
          <ItemCard item={{...item, name: item.name}} key={i} />
        ))
      }
    </div>
  )
}

export default ItemList

