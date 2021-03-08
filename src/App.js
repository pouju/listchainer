import React from 'react'
import { Route, HashRouter } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import { makeStyles } from '@material-ui/styles'
import {
  Container
} from '@material-ui/core'

import Home from './components/Home'
import Settings from './components/Settings'
import Chains from './components/Chains'

const useStyles = makeStyles(() => ({
  root: {
  }
}))

const App = () => {
  const classes = useStyles()

  {/*
    <div className={classes.root}>
      <Container>
        <Header />
        <SearchBar selected={selectedActivities} onChange={setSelectedActivities}/>
        <ItemList selected={selectedActivities} />
        <Footer />
      </Container>
    </div>
    */}

  return (
      <HashRouter>
        <div className={classes.root}>
          <Container>
            <Header />
            <Route exact path="/" component={Home}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/chains" component={Chains}/>
            
            <Footer />
          </Container>
        </div>
      </HashRouter>
  )

  
}


export default App
