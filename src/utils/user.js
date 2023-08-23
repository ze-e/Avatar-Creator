export function updateUser (stateCopy, userName, newUserData) {
  return stateCopy.userData.map((i) =>
    i.admin.userName.toLowerCase() === userName.toLowerCase() ? newUserData : i
  )
}

export function getFullName (userData) {
  return userData.name + ' the ' + userData.epiphet
}

export function getUserSubtitle (userData) {
  return 'Lv ' + userData.level + ' ' + userData.type + ' ' + userData.job
}

export function getUserDisplayLevel (userData) {
  return 'Lv ' + userData.level
}
