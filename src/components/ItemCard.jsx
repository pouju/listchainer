import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import PackItem from './PackItemCheckbox.jsx'

const useStyles = makeStyles(( theme ) => ({
  card: {
    margin: '5px',
  },
  grid: {
    display: 'flex'
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
        
        <Grid className={classes.grid}>
          <Grid item xs={6}>
            <Typography variant="h6">
              {item.name}
            </Typography>
            <Typography color='textSecondary'>
              included in: {item.foundIn.join(', ')}
            </Typography>
          </Grid>
            <Grid item xs={6} container justify='flex-end' alignItems="center">
              <PackItem packs={item.packs} />
            </Grid>
        </Grid>

      </CardContent>
    </Card>
  )
}

export default ItemCard