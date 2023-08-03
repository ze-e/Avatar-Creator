export function updateUser (stateCopy, userName, newUserData) {
  return stateCopy.userData.map((i) =>
    i.admin.userName.toLowerCase() === userName.toLowerCase() ? newUserData : i
  )
}
