import React from 'react'
import ItemCard from './ItemCard'
import activities from '../activities.json'
import {
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

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

  const items = 
    activities
      .filter(activity => selected.includes(activity.name))
      .map(activity => activity.items)
      .flat()
      .sort((a, b) => b.packs - a.packs)

  return (
    <div className={classes.root}>
      {
        !items.length
        ? <EmptyListText />
        : items.map((item, i) =>
            <ItemCard item={item} key={i} />
          )
      }
    </div>
  )
}

export default ItemList

