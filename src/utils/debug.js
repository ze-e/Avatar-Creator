export function debug ({ ...args }, tag = '') {
  let str = tag ? `====${tag}====` : ''
  Object.keys(args).forEach((a) => {
    str += '====' + a + ' : ' + JSON.stringify(args[a], null, 2)
  })
  console.log(str)
}
