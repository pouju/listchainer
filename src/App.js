import React from 'react'
import Header from './components/Header'
import ItemList from './components/ItemList'
import SearchBar from './components/SearchBar'
import { makeStyles } from '@material-ui/styles'
import {
  Container
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
  }
}))

const App = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container>
        <Header />
        <SearchBar />
        <ItemList />
      </Container>
    </div>
  )
}


export default App
