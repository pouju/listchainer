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

export {
  generateColor
}