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
import { Delete, Edit, Save, Add } from '@material-ui/icons'
import { generateColor, generateChainColor, chainAccordionColor, chainAccordionProgressBarColor, alreadyExists, isValidName } from '../utils'
import ChainActivityItemListSelect from './ChainActivityItemListSelect'
import ChainActivityItemListEdit from './ChainActivityItemListEdit'
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '50%',
    flexShrink: 0,
    alignSelf: 'center'
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
  },
  accordionDetails: {
    paddingLeft: 0,
    paddingRight: 0
  },
  addActivityForm: {
    display: 'flex'
  }
}))

const ChainAccordion = ({ chain, handleDelete, updateSelectedItems, chainsInEdit, setChainsInEdit, deleteActivityInChain, activities, setActivities, addActivityToChain }) => {
  const classes = useStyles()
  const [ newActivity, setNewActivity ] = useState('')
  const [ isOpen, setOpen ] = useState(false)
  const newActivityAlreadyExists = alreadyExists(newActivity, chain.activities.map(a => a.name))
  const getAllActivityNames = () => Object.keys(activities).filter(name => name.toLowerCase().includes(newActivity.toLowerCase()))
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
    if (event) event.preventDefault()
    if (isValidName(newActivity) && !newActivityAlreadyExists) {
      addActivityToChain(chain.name.trim(), newActivity)
      setNewActivity('')
    }
  }

  const buildActivityAccordions = (activity, i) => {
    const backgroundColor = generateColor(activity.name, false)
    const lightBgColor    = generateColor(activity.name, true)

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
            <AccordionDetails style={{ backgroundColor: lightBgColor }} >
              {
                chainInEdit(chain.name) 
                  ? <ChainActivityItemListEdit
                    activity={activity}
                    activities={activities}
                    setActivities={setActivities}
                    selectedItems={chain.selectedItems}
                    updateSelectedItems={updateSelectedItems}
                    chainName={chain.name}
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
                <Save />
              </IconButton>
            </>
            :
            <IconButton className={classes.iconButton} onClick={(event) => toggleChainEditMode(event, chain.name)}>
              <Edit />
            </IconButton>
        }
      </AccordionSummary>

      <LinearProgress className={classes.bar} classes={{ barColorPrimary: classes.barPrimary }} variant="determinate" value={progress()} />
      
      <AccordionDetails className={classes.accordionDetails}>
        <Table size="small">
          {
            chain.activities.length
              ? <TableBody>{chain.activities.map(buildActivityAccordions)}</TableBody>
              : <p>Nothing here. This chain is empty.</p>
          }
          {
            chainInEdit(chain.name) &&
            <TableRow>
              <TableCell colSpan={3}>
                <form onSubmit={addActivity} className={classes.addActivityForm}>
                  <Autocomplete
                    style={{ width: '95%' }}
                    freeSolo
                    value={newActivity}
                    options={getAllActivityNames()}
                    onInputChange={ (e, value) => setNewActivity(value) }
                    ListboxProps={{ style: { position: 'absolute', backgroundColor: '#fafafa', width: '100%' } }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth 
                        placeholder='Add a new activity...' 
                        error={newActivityAlreadyExists}
                        helperText={newActivityAlreadyExists ? 'Activity is already in the chain!' : ''}
                      />
                    )}
                  />
                  <IconButton onClick={() => addActivity()}>
                    <Add />
                  </IconButton>
                </form>
              </TableCell>
            </TableRow>
          }
        </Table>
      </AccordionDetails>
    </Accordion>
  )
}

export default ChainAccordion