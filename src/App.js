import React, { useState } from 'react'
import Header from './components/Header'
import ItemList from './components/ItemList'
import SearchBar from './components/SearchBar'
import Footer from './components/Footer'
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
  const [ selectedActivities, setSelectedActivities ] = useState([])

  return (
    <div className={classes.root}>
      <Container>
        <Header />
        <SearchBar selected={selectedActivities} onChange={setSelectedActivities}/>
        <ItemList selected={selectedActivities} />
        <Footer />
      </Container>
    </div>
  )
}


export default App
