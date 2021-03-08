import React, { useState }from 'react'
import { makeStyles } from '@material-ui/styles'
import ItemList from './ItemList'
import SearchBar from './SearchBar'

const useStyles = makeStyles(() => ({
  
}))

const Home = () => {
  const classes = useStyles()
  const [ selectedActivities, setSelectedActivities ] = useState([])

  return (
    <div >
      <SearchBar selected={selectedActivities} onChange={setSelectedActivities}/>
      <ItemList selected={selectedActivities} />
    </div>
  )
}

export default Home
