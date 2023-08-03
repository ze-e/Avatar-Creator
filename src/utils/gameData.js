export function getNextLevel (userLevels, xp) {
  return userLevels.find((level) => level.xp > xp)
}

export function isCompleted (user, quest) {
  return (
    user.admin?.userType === 'student' &&
    user.admin?.completedQuests.includes(quest.id)
  )
}

export function getAvailable (user, quest) {
  return (
    isCompleted(user, quest) === false &&
    quest.parents?.every((p) => user.admin.completedQuests.includes(p)) &&
    quest.descendants.length > 0 &&
    !quest.descendants.some((p) => user.admin.completedQuests.includes(p))
  )
}
