import React from 'react'
import ItemCard from './ItemCard'
import activities from '../activities.json'

const ItemList = ({ selected }) => {

  const items = 
    activities
      .filter(activity => selected.includes(activity.name))
      .map(activity => activity.items)
      .flat()
      .sort((a, b) => b.packs - a.packs)

  return (
    <div className="item-list">
      {items.map((item, i) =>
        <ItemCard item={item} key={i} />
      )}
    </div>
  )
}

export default ItemList

