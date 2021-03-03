import * as muiColors from '@material-ui/core/colors'

const colors = [
  muiColors.red, 
  muiColors.pink, 
  muiColors.purple, 
  muiColors.deepPurple, 
  muiColors.indigo, 
  muiColors.blue,
  muiColors.lightBlue, 
  muiColors.cyan, 
  muiColors.teal, 
  muiColors.green, 
  muiColors.lightGreen,
  muiColors.lime, 
  muiColors.yellow, 
  muiColors.amber, 
  muiColors.orange, 
  muiColors.deepOrange, 
  muiColors.brown
]

const generateColor = (activityName, shade) => {
  let sum = 0
  for (let i = 0; i < activityName.length; i++) {
    sum += activityName.charCodeAt(i)
  }
  return colors[sum % colors.length][shade]
}

export {
  generateColor
}