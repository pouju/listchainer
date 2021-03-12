import React from 'react'
import { Route, HashRouter } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { makeStyles } from '@material-ui/styles'
import {
  Container
} from '@material-ui/core'

import Home from './components/Home'
import Settings from './components/Settings'
import MyLists from './components/MyLists'
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
            <Route exact path="/" component={Home}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/mylists" component={MyLists}/>
          </DndProvider>      
          <Footer />
        </Container>
      </HashRouter>  
    </div>
  )

}

export default App
