// import { debug } from './debug'

export function getLevelIndex (levels, id) {
  return levels.findIndex((level) => level.id === id)
}

export function getLevel (levels, id) {
  return levels.find((level) => level.id === id)
}

export function getQuestLevel (levels, questId) {
  const result = levels.filter(
    (level) => level.quests.map((q) => q.id).includes(questId) === true
  )
  return result.length > 0 ? result[0] : null
}

export function getQuestLevelIndex (levels, questId) {
  const result = getQuestLevel(levels, questId)
  return result ? getLevelIndex(levels, result.id) : null
}

export function getPrevLevelIndex (levels, id) {
  return levels.findIndex((level) => level.id === id) - 1
}

export function getPrevLevel (levels, id) {
  return levels[getPrevLevelIndex(levels, id)]
}

export function getNextLevelIndex (levels, id) {
  if (id === null) return null
  return levels.findIndex((level) => level.id === id) + 1
}

export function getNextLevel (levels, id) {
  if (id === null) return null
  return levels[getNextLevelIndex(levels, id)]
}
