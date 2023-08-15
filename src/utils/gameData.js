export function getLevelByXP (levelData, xp) {
  let closestKey = null
  let closestDistance = Infinity

  levelData.forEach(row => {
    Object.entries(row).forEach(([key, value]) => {
      if (value <= xp && (xp - value) < closestDistance) {
        closestKey = parseInt(key)
        closestDistance = xp - value
      }
    })
  })
  return parseInt(closestKey)
}
