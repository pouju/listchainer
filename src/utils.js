import presets from './activities.json'

const getCachedActivities = () => {
  const cache = window.localStorage.getItem('cachedActivities')

  return cache
    ? JSON.parse(cache)
    : presets
}

const getCachedChains = () => {
  const cache = window.localStorage.getItem('cachedChains')

  return cache
    ? Object.entries(JSON.parse(cache))
    : [] // Object.entries(testChains)
}

const colors = [
  // Index 0 -> normal, 1 -> light
  ['#FF7B7B', '#FFA9A9'],  // RED
  ['#FFF27B', '#FFF7A9'],  // YELLOW
  ['#7BCFFF', '#A9E0FF'],  // LIGHT BLUE
  ['#FFC27B', '#FFD7A9'],  // ORANGE
  ['#7BFFBF', '#A9FFD5'],  // LIGHT GREEN
  ['#7B80FF', '#A9ACFF'],  // INDIGO
  ['#EC7BFF', '#F3A9FF'],  // PURPLE
  ['#85FF7B', '#B0FFA9'],  // LIGHT GREEN
  ['#49CCBC', '#89DED3'],  // DARK GREEN
  ['#FF7BD2', '#FFA9E2'],  // PINK
  ['#6449CC', '#9A89DE']   // DARK INDIGO
]

const mainColor = '#62D8FE'
const mainColorLight = '#99E6FE'

const chainAccordionColor = '#EEEEEE'
const chainAccordionProgressBarColor = '#7BFFBF'

const generateColor = (activityName, light) => {
  let sum = 0
  for (let i = 0; i < activityName.length; i++) {
    sum += activityName.charCodeAt(i)
  }
  return colors[sum % colors.length][light ? 1 : 0]
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
  
  return `linear-gradient(to right, ${colors}`

}

const isTouchDevice = () => {
  if ('ontouchstart' in window) {
    return true
  }
  return false
}

const alreadyExists = (value, array) => 
  value && array.map(item => item.toLowerCase()).includes(value.trim().toLowerCase())

const isValidName = (name) => name && name.trim()

export {
  getCachedActivities,
  getCachedChains,
  generateColor,
  generateChainColor,
  isTouchDevice,
  alreadyExists,
  isValidName,
  chainAccordionColor,
  chainAccordionProgressBarColor,
  mainColor,
  mainColorLight
}