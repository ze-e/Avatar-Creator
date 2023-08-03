import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

import { DataContext } from 'contexts/DataContext'
import { ModalContext } from 'contexts/ModalContext'

import { setDefaultParent } from 'utils/quest'
import { createColor } from 'utils/color'
import SETTINGS from 'config/constants'
import SkillListQuest from './SkillListQuest'

import { ModalQuestAdd } from 'components/Modal/ModalTypes'

export default function SkillListLevel ({ index, level, teacherView }) {
  const [levelXP, setLevelXP] = useState(0)

  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { setModalOpen, setModalContent } = useContext(ModalContext)

  // get total XP for level
  useEffect(() => {
    if (level?.quests) {
      const xp =
        10 *
        (level.quests?.length > 1
          ? level.quests?.reduce((a, b) => a.skills?.length + b.skills?.length)
          : level.quests[0]?.skills?.length)
      setLevelXP(xp)
    }
  }, [state])

  // disable button under certain conditions
  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    // first column can only contain one item
    if (
      index === 0 ||
      state.data.levels[index].quests.length >= SETTINGS.MAX_CHILDREN
    ) {
      setDisableButton(true)
    } else setDisableButton(false)
  }, [index, state])

  function addItem (e) {
    const input = e.target[0]
    const newQuest = {
      id: uuidv4(),
      name: input.value,
      skills: ['New skill'],
      parents: setDefaultParent(state.data.levels, index),
      descendants: [],
      color: createColor()
    }

    // create new if possible
    if (newQuest.parents) {
      dispatch({
        type: ACTIONS.ADD_ITEM,
        payload: { newItem: newQuest, levelId: level.id }
      })
    } else setDisableButton(true)
  }

  return (
    <div className="skillListLevel">
      <div className="skillListLevel__title m-title-stroke-white">
        <h3>{`Level ${index + 1}`}</h3>
        <h3>{` ${levelXP} XP/ Gold`}</h3>
      </div>

      {level.quests.length > 0 &&
        level.quests.map((quest, i) => {
          return (
            <SkillListQuest
              key={quest.id}
              quest={quest}
              index={i}
              levelIndex={index}
              teacherView={teacherView}
            />
          )
        })}
      {!disableButton && teacherView && (
        <button
          className="skillListLevel__button"
          type="button"
          onClick={() => {
            setModalOpen(true)
            setModalContent(
              <ModalQuestAdd
                handleSubmit={(e) => {
                  e.preventDefault()
                  addItem(e)
                  setModalOpen(false)
                }}
              />
            )
          }}
        >
          Add New Quest
        </button>
      )}
    </div>
  )
}

SkillListLevel.propTypes = {
  index: PropTypes.number,
  level: PropTypes.object,
  teacherView: PropTypes.bool
}
