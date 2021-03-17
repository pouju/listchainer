import React, { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { Delete, Edit, Done, CheckCircleOutline } from '@material-ui/icons'
import { generateColor } from '../utils'
import ChainActivityItemListSelect from './ChainActivityItemListSelect'
import ChainActivityItemListEdit from './ChainActivityItemListEdit'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '70%',
    flexShrink: 0,
  },
  secondaryHeading: {
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 20
  },
}))

const ChainAccordion = ({ chain, handleDelete, updateSelectedItems, chainsInEdit, setChainsInEdit, deleteActivityInChain, activities, setActivities }) => {
  const classes = useStyles()
  const backgroundColor = generateColor(chain.name)

  const chainInEdit = (chainName) => chainsInEdit.includes(chainName)

  const toggleChainEditMode = (event, chainName) => {
    event.stopPropagation()
    if (chainsInEdit.includes(chainName)) {
      setChainsInEdit(chainsInEdit.filter(chain => chain != chainName))
      console.log('edit off')
    }
    else {
      const newChainsInEdit = chainsInEdit.concat(chainName)
      setChainsInEdit(newChainsInEdit)
      console.log('edit on')
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
                  : <></>
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
    <Accordion style={{ backgroundColor }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
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
                <CheckCircleOutline />
              </IconButton>
            </>
            : 
            <IconButton className={classes.iconButton} onClick={(event) => toggleChainEditMode(event, chain.name)}>
              <Edit />
            </IconButton>
        }
        
      </AccordionSummary>
      <AccordionDetails>
        <Table size="small">
          {
            chain.activities.length
              ? <TableBody>{chain.activities.map(buildActivityAccordions)}</TableBody>
              : <p>Nothing here. This chain is empty</p>
          }
          
        </Table>
      </AccordionDetails>
    </Accordion>
  )
}

export default ChainAccordion