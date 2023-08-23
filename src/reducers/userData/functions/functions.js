/* eslint-disable dot-notation */

import { updateUser } from 'utils/user'
import { getLevelByXP } from 'utils/gameData'

// increase xp and gold by amount
function gainXP (state, { userName, amount }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  )
  user.data.gold = parseInt(user.data.gold) + parseInt(amount)
  user.data.xp = parseInt(user.data.xp) + parseInt(amount)
  user.data.level = gainLevel(stateCopy.gameData.levelTable, user.data.xp, user.data.level)
  stateCopy.userData = updateUser(stateCopy, userName, user)
  return stateCopy
}

// save last state
function saveLastState (state, { userName, prevData }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  )
  if (Array.isArray(prevData)) {
    prevData.forEach(d => {
      if (Object.keys(user.admin.prevData).includes(d.key)) user['admin']['prevData'][d.key] = d.value
      else user.admin.prevData = user.admin.prevData.concat(d)
    })
  } else {
    if (Object.keys(user.admin.prevData).includes(prevData.key)) user['admin']['prevData'][prevData.key] = prevData.value
    else user.admin.prevData = user.admin.prevData.concat(prevData)
  }

  user.admin.lastUpdated = new Date()
  stateCopy.userData = updateUser(stateCopy, userName, user)
  return stateCopy
}

function undo (state, { userName, key }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  )

  // reset values
  if (Array.isArray(key)) {
    key.forEach((k) => {
      const prevData = user['admin']['prevData']
      user['data'][k] = prevData.find(d => d.key === k).value
    })
    // erase from prevData
    user.admin.prevData = user.admin.prevData.filter(i => !key.includes(i.key))
  } else {
    const prevData = user['admin']['prevData']
    user['data'][key] = prevData.find(d => d.key === key).value
    // erase from prevData
    user.admin.prevData = user.admin.prevData.filter(i => i.key !== key)
  }
  stateCopy.userData = updateUser(stateCopy, userName, user)
  return stateCopy
}

function gainLevel (leveldata, xp, userLevel) {
  // each time the users xp doubles, it grows a level
  const newLevel = getLevelByXP(leveldata, xp)
  if (newLevel > userLevel) {
    console.log('User gained a level!')
    return newLevel
  }
  return userLevel
}

export default {
  gainXP,
  saveLastState,
  undo
}
