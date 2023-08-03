export const createColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`
export const createDarkVariation = (color1) => {
  let color2 = '#808080'
  const percentage = 0.5

  // check to see if we need to convert 3 char hex to 6 char hex, else slice off hash
  //      the three character hex is just a representation of the 6 hex where each character is repeated
  //      ie: #060 => #006600 (green)
  if (color1.length === 4) {
    color1 =
      color1[1] + color1[1] + color1[2] + color1[2] + color1[3] + color1[3]
  } else {
    color1 = color1.substring(1)
  }
  if (color2.length === 4) {
    color2 =
      color2[1] + color2[1] + color2[2] + color2[2] + color2[3] + color2[3]
  } else {
    color2 = color2.substring(1)
  }

  // we have valid input, convert colors to rgb
  color1 = [
    parseInt(color1[0] + color1[1], 16),
    parseInt(color1[2] + color1[3], 16),
    parseInt(color1[4] + color1[5], 16)
  ]
  color2 = [
    parseInt(color2[0] + color2[1], 16),
    parseInt(color2[2] + color2[3], 16),
    parseInt(color2[4] + color2[5], 16)
  ]

  // blend
  let color3 = [
    (1 - percentage) * color1[0] + percentage * color2[0],
    (1 - percentage) * color1[1] + percentage * color2[1],
    (1 - percentage) * color1[2] + percentage * color2[2]
  ]

  // convert to hex
  color3 = '#' + int2hex(color3[0]) + int2hex(color3[1]) + int2hex(color3[2])

  // return hex
  return color3
}

/*
    convert a Number to a two character hex string
    must round, or we will end up with more digits than expected (2)
    note: can also result in single digit, which will need to be padded with a 0 to the left
    @param: num         => the number to conver to hex
    @returns: string    => the hex representation of the provided number
*/
function int2hex (num) {
  let hex = Math.round(num).toString(16)
  if (hex.length === 1) {
    hex = '0' + hex
  }
  return hex
}
