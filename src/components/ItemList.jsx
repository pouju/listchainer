import React from 'react'
import ItemCard from './ItemCard'
import items from '../items.json'

const ItemList = () => (
  <div className="item-list">
    {items.map(item => <ItemCard item={item} />)}
  </div>
)

export default ItemList

