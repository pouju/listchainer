import React from 'react'
import { 
  Checkbox,
  Table, 
  TableBody, 
  TableCell, 
  TableRow,
  Typography, 
} from '@material-ui/core'

const ChainActivityItemListSelect = ({ activity, chainName, selectedItems, updateSelectedItems }) => {

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

  const EmptyRow = () => (
    <TableRow>
      <TableCell>
        <Typography>
          This activity contains no items, edit activity to add them.
        </Typography>
      </TableCell>
    </TableRow>
  )

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
        { 
          activity.items.length
            ? activity.items.map(buildRow)
            : <EmptyRow />
        }
      </TableBody>
    </Table>
  )
}

export default ChainActivityItemListSelect