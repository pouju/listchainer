import React from 'react'
import {
  Card,
  CardContent,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(( theme ) => ({
  card: {
    margin: '5px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
}))

const ItemCard = ({ item }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card} style={{backgroundColor: item.bgColor}}>
      <CardContent className={classes.content}>
        <Typography variant="h6">
          {item.name}
        </Typography>
        <Typography color='textSecondary'>
          {item.packs} packs, included in: {item.foundIn.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ItemCard