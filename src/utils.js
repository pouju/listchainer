import * as muiColors from '@material-ui/core/colors'

const colors = [
  '#FF7B7B',  // RED
  '#FFF27B',  // YELLOW
  '#7BCFFF',  // LIGHT BLUE
  '#FFC27B',  // ORANGE
  '#7BFFBF',  // LIGHT GREEN
  '#7B80FF',  // INDIGO
  '#EC7BFF',  // PURPLE
  '#0048BA',
  '#7CB9E8',
  '#B284BE',
  '#EFDECD',
  '#E52B50',
  '#3B7A57',
  '#FF7E00',
  '#9966CC',
  '#A4C639',
  '#915C83',
  '#008000',
  '#00FFFF',
  '#7FFFD4',
  '#D0FF14',
  '#FF9966',
  '#568203',
  '#89CFF0',
  '#F4C2C2',
  '#FF91AF',
  '#848482',
  '#F5F5DC',
  '#3D2B1F',
  '#54626F',
  '#ACE5EE',
  '#1F75FE',
  '#CD7F32',
  '#C95A49',
  '#E23D28',
  '#9FA91F',
  '#D2691E',
  '#F88379',
  '#8C92AC',
  '#FBEC5D',
  '#FFBCD9',
  '#00FFFF',
]

const mainColor = '#62D8FE'
const mainColorLight = '#99E6FE'

const chainAccordionColor = '#EEEEEE'
const chainAccordionProgressBarColor = '#7BFFBF'

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
  
  return `linear-gradient(to right, ${colors}`

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
  isTouchDevice,
  chainAccordionColor,
  chainAccordionProgressBarColor,
  mainColor,
  mainColorLight
}