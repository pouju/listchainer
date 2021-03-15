import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const type = 'movableitem'

const MovableItem = ({ contentItem, index, moveItem }) => {
  const ref = useRef(null) // initialize the reference

  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      moveItem(dragIndex, hoverIndex)

      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: type,
    item: { id: contentItem.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  drag(drop(ref))

  const opacity = isDragging ? 0.2 : 1
  const marginTop = 10

  return (
    <div ref={ref} className={'movable item'} style={{ opacity, marginTop }}>
      {contentItem}
    </div>
  )
}

const MovableItemList = ({ items, moveItem }) => {

  const buildMovableItem = (item, index) => {
    return (
      <MovableItem
        contentItem={item}
        index={index}
        key={`${item.props.id}-movable-item`}
        moveItem={moveItem}
      >
      </MovableItem>
    )
  }

  return <section> {items.map(buildMovableItem)}</section>
  
}

export default MovableItemList