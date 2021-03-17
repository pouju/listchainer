import React, { useState } from 'react'
import { 
  Checkbox, 
  makeStyles, 
  Table, 
  TableBody, 
  TableCell, 
  TableRow, 
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '50%',
    flexShrink: 0,
    alignSelf: 'center',
    display: 'flex'
  },
  secondaryHeading: {
    alignSelf: 'center'
  },
  iconButton: {
    float: 'right',
    marginLeft: 'auto'
  },
  pinIcon: {
    marginRight: '10px'
  }
}))


const ChainActivityItemListSelect = ({ activity, chainName, selectedItems, updateSelectedItems }) => {
  const classes = useStyles()

  const isSelected = (name) => selectedItems.includes(name)

  const handleClick = (event, name) => {
    if (isSelected(name)) {
      updateSelectedItems(chainName, selectedItems.filter(item => item != name))
    }
    else {
      const newSelectedItems = selectedItems
      selectedItems.push(name)
      updateSelectedItems(chainName, newSelectedItems)
    }
  }

  // item[0] means name
  const buildRow = (item, i) => (
    <TableRow
      hover
      onClick={(event) => handleClick(event, item[0])}
      role="checkbox"
      aria-checked={isSelected(item[0])}
      tabIndex={-1}
      key={i}
      selected={isSelected(item[0])}
    >
      <TableCell>{item[0]}</TableCell>
      {/* <TableCell>packed {item.packs} times</TableCell> */}
      <TableCell padding="checkbox">
        <Checkbox
          checked={isSelected(item[0])}
        />
      </TableCell>
    </TableRow>
  )

  return (
    <Table>
      <TableBody>
        {activity.items.map(buildRow)}
      </TableBody>
    </Table>
  )
}

export default ChainActivityItemListSelect