import React from 'react'
import { Route, HashRouter } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { makeStyles } from '@material-ui/styles'
import {
  Container
} from '@material-ui/core'

import CreateChains from './pages/CreateChains'
import Settings from './pages/Settings'
import Chains from './pages/Chains'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { isTouchDevice } from './utils'
import { TouchBackend } from 'react-dnd-touch-backend'

const useStyles = makeStyles(() => ({
  root: {
  }
}))

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend

const App = () => {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>
      <HashRouter>
        <Container>
          <Header />
          <DndProvider backend={backendForDND}>
            <Route exact path="/" component={Chains}/>
            <Route path="/create-chains" component={CreateChains}/>
            <Route path="/settings" component={Settings}/>
          </DndProvider>      
          <Footer />
        </Container>
      </HashRouter>  
    </div>
  )

}

export default App
