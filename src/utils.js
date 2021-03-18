import * as muiColors from '@material-ui/core/colors'

const colors = [
  '#FF7B7B',  // RED
  '#FFF27B',  // YELLOW
  '#7BCFFF',  // LIGHT BLUE
  '#FFC27B',  // ORANGE
  '#7BFFBF',  // LIGHT GREEN
  '#7B80FF',  // INDIGO
  '#EC7BFF'   // PURPLE
]

const generateColor = (activityName) => {
  let sum = 0
  for (let i = 0; i < activityName.length; i++) {
    sum += activityName.charCodeAt(i)
  }
  return colors[sum % colors.length]
}

const generateChainColor = (activities) => {

  const totalLength = activities.reduce((count, activity) => count + activity.items.length, 0)
  let current = 0
  const intervals = activities.map(activity => {
    const temp = current
    current += activity.items.length
    return [(temp / totalLength) * 100, ((temp + activity.items.length) / totalLength) * 100]
  })

  const colors = activities
    .map(activity => [generateColor(activity.name), activity.items.length])
    .map((colorItems, i) => `${colorItems[0]} ${intervals[i][0]}% ${intervals[i][1]}%`)
    .join()
  
  return colors

}

const isTouchDevice = () => {
  if ('ontouchstart' in window) {
    return true
  }
  return false
}

export {
  generateColor,
  generateChainColor,
  isTouchDevice
}