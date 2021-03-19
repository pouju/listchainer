import React, { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { Delete, Edit, CheckCircleOutline } from '@material-ui/icons'
import { green } from '@material-ui/core/colors'
import { generateColor, generateChainColor, chainAccordionColor, chainAccordionProgressBarColor } from '../utils'
import ChainActivityItemListSelect from './ChainActivityItemListSelect'
import ChainActivityItemListEdit from './ChainActivityItemListEdit'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '50%',
    flexShrink: 0,
  },
  secondaryHeading: {
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 20
  },
  bar: {
    height: 5,
    backgroundColor: chainAccordionColor
  },
  barPrimary: {
    backgroundColor: chainAccordionProgressBarColor
  }
}))

const ChainAccordion = ({ chain, handleDelete, updateSelectedItems, chainsInEdit, setChainsInEdit, deleteActivityInChain, activities, setActivities, addActivityToChain }) => {
  const classes = useStyles()
  const [ newActivity, setNewActivity ] = useState('')
  const [ isOpen, setOpen ] = useState(false)

  const chainInEdit = (chainName) => chainsInEdit.includes(chainName)

  const isAllItemsSelected = (activity) => activity.items.every(item => chain.selectedItems.includes(item[0]) )

  const progress = () => {
    const noOfItems = [ ...new Set(chain.activities.reduce((allItems, activity) => allItems.concat(Object.entries(activity.items).map(([_, value]) => value[0])), [])) ].length
    return chain.selectedItems.length * 100 / noOfItems
  }

  const handleClick = (event, activity) => {
    event.stopPropagation()
    if (isAllItemsSelected(activity)) {
      const activityItemNames = activity.items.map(item => item[0])
      updateSelectedItems(chain.name, chain.selectedItems.filter( item => !activityItemNames.includes(item) ))
    }
    else {
      const newSelectedItems = chain.selectedItems
      activity.items.forEach(item => {
        if (!newSelectedItems.includes(item[0])) {
          chain.selectedItems.push(item[0])
        }
      })
      updateSelectedItems(chain.name, newSelectedItems)
    }
  }

  const toggleChainEditMode = (event, chainName) => {
    event.stopPropagation()
    if (chainsInEdit.includes(chainName)) {
      setChainsInEdit(chainsInEdit.filter(chain => chain != chainName))
    }
    else {
      const newChainsInEdit = chainsInEdit.concat(chainName)
      setChainsInEdit(newChainsInEdit)
    }
  }

  const addActivity = (event) => {
    event.preventDefault()
    if (newActivity && !chain.activities.map(act => act.name).includes(newActivity)) {
      addActivityToChain(chain.name, newActivity)
      setNewActivity('')
    }
  }

  const buildActivityAccordions = (activity, i) => {
    const backgroundColor = generateColor(activity.name)

    return (
      <TableRow
        hover
        tabIndex={-1}
        key={i}
      >
        <TableCell>    
          <Accordion style={{ backgroundColor }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography className={classes.heading}>{activity.name}</Typography>
              <Typography color='textSecondary' className={classes.secondaryHeading}>
                { activity.items.reduce((accumulator, item) => accumulator + (chain.selectedItems.includes(item[0]) ? 1 : 0), 0) } / { activity.items.length } packed
              </Typography>
              {
                chainInEdit(chain.name)
                  ?
                  <IconButton className={classes.iconButton} onClick={() => deleteActivityInChain(chain.name, activity.name)}>
                    <Delete />
                  </IconButton>
                  : 
                  <Checkbox
                    onClick={(event) => handleClick(event, activity)}
                    checked={isAllItemsSelected(activity)}
                  /> 
              }
            </AccordionSummary>
            <AccordionDetails>
              {
                chainInEdit(chain.name) 
                  ? <ChainActivityItemListEdit
                    activity={activity}
                    activities={activities}
                    setActivities={setActivities}
                    selectedItems={chain.selectedItems}
                    updateSelectedItems={updateSelectedItems}
                  />
                  : <ChainActivityItemListSelect
                    activity={activity}
                    chainName={chain.name}
                    selectedItems={chain.selectedItems}
                    updateSelectedItems={updateSelectedItems}
                  />
              }
            </AccordionDetails>
          </Accordion>
        </TableCell>
      </TableRow>
    )
  }
  
  return (
    <Accordion onChange={() => setOpen(!isOpen)} style={{ background: chainAccordionColor }}>
      <AccordionSummary style={{ background: generateChainColor(chain.activities) }} expandIcon={<ExpandMore />}>
        <Typography className={classes.heading}>{chain.name}</Typography>
        <Typography color='textSecondary' className={classes.secondaryHeading}>
          { chain.selectedItems.length } / { [ ...new Set(chain.activities.reduce((allItems, activity) => allItems.concat(Object.entries(activity.items).map(([_, value]) => value[0])), [])) ].length } packed
        </Typography>
        
        {
          chainInEdit(chain.name)
            ?
            <>
              <IconButton className={classes.iconButton} onClick={handleDelete}>
                <Delete />
              </IconButton>
              <IconButton className={classes.iconButton} onClick={(event) => toggleChainEditMode(event, chain.name)}>
                <CheckCircleOutline style={{ color: green[500] }} />
              </IconButton>
            </>
            : 
            isOpen
              ?
              <IconButton className={classes.iconButton} onClick={(event) => toggleChainEditMode(event, chain.name)}>
                <Edit />
              </IconButton>
              : <></>
        }
      </AccordionSummary>

      <LinearProgress className={classes.bar} classes={{ barColorPrimary: classes.barPrimary }} variant="determinate" value={progress()} />
      
      <AccordionDetails>
        <Table size="small">
          {
            chain.activities.length
              ? <TableBody>{chain.activities.map(buildActivityAccordions)}</TableBody>
              : <p>Nothing here. This chain is empty</p>
          }
          {
            chainInEdit(chain.name)
              ?
              <TableRow>
                <TableCell colSpan={3}>
                  <form onSubmit={addActivity}>
                    <TextField
                      fullWidth 
                      placeholder='Add a new activity...' 
                      error={chain.activities.map(act => act.name).includes(newActivity)}
                      value={newActivity}
                      onChange={(event) => setNewActivity(event.target.value)} />
                  </form>
                </TableCell>
              </TableRow>
              : <></>
          }
        </Table>
      </AccordionDetails>
    </Accordion>
  )
}

export default ChainAccordion