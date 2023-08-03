import SETTINGS from 'config/constants'
import {
  getLevel,
  getLevelIndex,
  getQuestLevel,
  getPrevLevel,
  getQuestLevelIndex
} from 'utils/level'
import {
  attachChild,
  getDescendants,
  setDefaultParent,
  sortQuests
} from '../../../utils/quest'
import { createColor } from '../../../utils/color'
import { v4 as uuidv4 } from 'uuid'

function addItem (state, { newItem, levelId }) {
  const stateCopy = { ...state }

  // add newItem id to parent
  stateCopy.data.levels.forEach((level) => {
    const newParent = level.quests.find(
      (level) => level.id === newItem.parents[0]
    )
    newParent?.descendants.push(newItem.id)
  })

  // add newItem to level if level exists, otherwise create new level
  const level = getLevel(stateCopy.data.levels, levelId)
  if (level) {
    level.quests = [...level.quests, newItem]
    sortQuests(stateCopy.data.levels, level)
  } else {
    stateCopy.data.levels = [
      ...stateCopy.data.levels,
      { id: uuidv4(), color: createColor(), quests: [newItem] }
    ]
  }

  return stateCopy
}

function deleteItem (state, { item }) {
  const stateCopy = { ...state }
  const level = getQuestLevel(stateCopy.data.levels, item.id)
  if (level === null) return stateCopy

  const levelIndex = getLevelIndex(stateCopy.data.levels, level.id)

  // last quest in first level cannot be deleted
  if (levelIndex === 0 && level.quests.length === 0) {
    return stateCopy
  }

  // remove item id from parent
  const newParents = getPrevLevel(
    stateCopy.data.levels,
    level.id
  ).quests.filter((quest) => item.parents.includes(quest.id))
  if (newParents.length > 0) {
    newParents.forEach((parent) => {
      parent.descendants = parent.descendants.filter((i) => i !== item.id)
    })
  }

  // remove quest from level
  level.quests = level.quests.filter((q) => q.id !== item.id)

  // if item is only one in level, delete level.
  if (level.quests.length === 0) {
    stateCopy.data.levels = stateCopy.data.levels.filter(
      (l) => l.id !== level.id
    )
  }

  // reattach parents and children
  const descendants = getDescendants(stateCopy.data.levels, item)
  if (descendants) {
    descendants.forEach((d) => {
      d.parents = setDefaultParent(
        stateCopy.data.levels,
        getQuestLevelIndex(stateCopy.data.levels, d.id)
      )
      attachChild(stateCopy.data.levels, d)
    })
  }

  sortQuests(stateCopy.data.levels, level)

  return stateCopy
}

function setParents (state, { quest, parentIds }) {
  if (!parentIds || parentIds.length < 1) return state
  const stateCopy = { ...state }
  quest.parents = [...parentIds]
  updateQuest(stateCopy.data.levels, quest)

  // remove quest from old parents and attach to new
  const prevLevel = getPrevLevel(
    stateCopy.data.levels,
    getQuestLevel(stateCopy.data.levels, quest.id).id
  )
  prevLevel.quests.forEach((q) => {
    parentIds.includes(q.id)
      ? q.descendants.push(quest.id)
      : q.descendants.filter((d) => d !== quest.id)
  })

  return stateCopy
}

function changeName (state, { quest, name }) {
  if (name.length < 1) return state
  const stateCopy = { ...state }
  quest.name = name
  updateQuest(stateCopy.data.levels, quest)

  return stateCopy
}

function addSkill (state, { quest, skill }) {
  if (quest.skills.length === SETTINGS.MAX_SKILLS) return state

  const stateCopy = { ...state }
  quest.skills.push(skill)
  updateQuest(stateCopy.data.levels, quest)

  return stateCopy
}

function deleteSkill (state, { quest, skill }) {
  if (quest.skills.length === 1) return state

  const stateCopy = { ...state }
  quest.skills = quest.skills.filter((s) => s !== skill)
  updateQuest(stateCopy.data.levels, quest)

  return stateCopy
}

function renameSkill (state, { quest, skill, name }) {
  const stateCopy = { ...state }
  quest.skills.splice(quest.skills.indexOf(skill), 1, name)
  updateQuest(stateCopy.data.levels, quest)
  return stateCopy
}

function updateQuest (levels, quest) {
  return getQuestLevel(levels, quest.id).quests.map((q) =>
    q.id === quest.id ? quest : q
  )
}

export default {
  addItem,
  deleteItem,
  setParents,
  changeName,
  addSkill,
  deleteSkill,
  renameSkill
}
