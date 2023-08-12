/* eslint-disable dot-notation */

import { getAvatarData } from 'utils/avatar'

import { updateUser } from 'utils/user'

function editData (state, { userName, field, newVal }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  )
  user.data[field] = newVal
  stateCopy.userData = updateUser(stateCopy, userName, user)
  return stateCopy
}

function editAdmin (state, { userName, field, newVal }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  )
  user.admin[field] = newVal
  stateCopy.userData = updateUser(stateCopy, userName, user)
  return stateCopy
}

function changeAvatar (state, { userName, changeTo }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  )
  user.avatar = changeTo
  user.data.type = getAvatarData(
    stateCopy.avatarData,
    'full',
    user.avatar
  ).name

  stateCopy.userData = updateUser(stateCopy, userName, user)
  return stateCopy
}

// increase xp and gold by amount
function gainXP (state, { userName, amount }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  )
  const prevXP = user.data.xp
  user.data.gold = parseInt(user.data.gold) + parseInt(amount)
  user.data.xp = parseInt(user.data.xp) + parseInt(amount)
  user.data.level = gainLevel(user, prevXP, user.data.xp)
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

function gainLevel (user, prevXP, newXP) {
  // each time the users xp doubles, it grows a level
  return user.data.level > 0 && prevXP * 2 === newXP
    ? user.data.level + 1
    : user.data.level
}

export default {
  editData,
  editAdmin,
  changeAvatar,
  gainXP,
  saveLastState,
  undo
}
