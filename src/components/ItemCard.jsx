import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import PackItem from './PackItemCheckbox.jsx'

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
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <Typography variant="h6">
              {item.name}
            </Typography>
            <Typography color='textSecondary'>
              {item.packs} packs, included in: {item.foundIn.join(', ')}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {PackItem()}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ItemCard