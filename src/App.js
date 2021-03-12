import React from 'react'
import { Route, HashRouter } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { makeStyles } from '@material-ui/styles'
import {
  Container
} from '@material-ui/core'

import Home from './pages/Home'
import Settings from './pages/Settings'
import Chains from './pages/Chains'

const useStyles = makeStyles(() => ({
  root: {
  }
}))

const App = () => {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>
      <HashRouter>
        <Container>
          <Header />
          <Route exact path="/" component={Home}/>
          <Route path="/settings" component={Settings}/>
          <Route path="/chains" component={Chains}/>      
          <Footer />
        </Container>
      </HashRouter>  
    </div>
  )

}

export default App
