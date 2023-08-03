import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { DataContext } from 'contexts/DataContext'
import { ModalContext } from 'contexts/ModalContext'
import { UserContext } from 'contexts/UserContext'

import { ModalQuestEdit, ModalSkillAdd } from 'components/Modal/ModalTypes'
import { getParents, getDescendants } from 'utils/quest'

import { getNextLevel, getQuestLevel, getPrevLevel } from 'utils/level'
import { createDarkVariation } from 'utils/color'
import { v4 as uuidv4 } from 'uuid'
import SETTINGS from 'config/constants'

import SkillListSkill from './SkillListSkill'

export default function SkillListQuest ({
  index,
  quest,
  levelIndex,
  teacherView
}) {
  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { setModalOpen, setModalContent } = useContext(ModalContext)
  const { user, setUser } = useContext(UserContext)

  const [parents, setParents] = useState(null)
  const [descendants, setDescendants] = useState(null)
  const [prevLevel, setPrevLevel] = useState(
    getPrevLevel(
      state.data.levels,
      getQuestLevel(state.data.levels, quest.id).id
    )
  )

  const completed =
    user.admin?.userType === 'student' &&
    user.admin?.completedQuests.includes(quest.id)

  const [isAvailable, setIsAvailable] = useState(false)
  const [isCurrent, setIsCurrent] = useState(false)
  const hasCurrent =
    user.admin?.userType === 'student' && user.admin?.currentQuest

  useEffect(() => {
    // it is considered available if 1. it is not completed 2. all parents are completed 3.there are no descendants or there are descendants but none are completed
    if (
      !completed &&
      quest.parents.every((p) => user.admin.completedQuests.includes(p)) &&
      (!quest.descendants ||
        !quest.descendants.length > 0 ||
        (quest.descendants.length > 0 &&
          !quest.descendants.some((p) =>
            user.admin.completedQuests.includes(p)
          )))
    ) {
      setIsAvailable(true)
    } else setIsAvailable(false)
  }, [user.admin.completedQuests])

  useEffect(() => {
    setIsCurrent(!completed && quest.id === user.admin.currentQuest)
  }, [user.admin.currentQuest])

  useEffect(() => {
    setParents(getParents(state.data?.levels, quest))
    setDescendants(getDescendants(state.data?.levels, quest))
    setPrevLevel(
      getPrevLevel(
        state.data.levels,
        getQuestLevel(state.data.levels, quest.id).id
      )
    )
  }, [state])

  // add child to next level
  function addChild (e) {
    e.preventDefault()
    const input = e.target[0]
    const inputVal = input.value

    const newQuest = {
      id: uuidv4(),
      name: inputVal,
      skills: ['New skill'],
      parents: [quest.id],
      descendants: [],
      color: quest.color
    }
    const nextLevel = getNextLevel(
      state.data.levels,
      getQuestLevel(state.data.levels, quest.id).id
    )
    if (!descendants || descendants.length < SETTINGS.MAX_CHILDREN) {
      dispatch({
        type: ACTIONS.ADD_ITEM,
        payload: {
          newItem: newQuest,
          levelId: nextLevel ? nextLevel.id : null
        }
      })
    }

    // close modal
    setModalOpen(false)
  }

  async function setCurrentQuest () {
    await dispatch({
      type: ACTIONS.EDIT_ADMIN,
      payload: {
        userName: user.admin.userName,
        field: 'currentQuest',
        newVal: quest.id
      }
    })
    const userData = state.userData.find(
      (i) =>
        i.admin.userName.toLowerCase() === user.admin.userName.toLowerCase()
    )
    setUser(userData)
  }

  return completed || user.admin?.userType === 'teacher' || isAvailable ? (
    <div
      style={{ backgroundColor: createDarkVariation(quest.color) }}
      className={`skillListQuest  ${
        user.admin?.userType !== 'teacher' &&
        isAvailable &&
        !isCurrent &&
        'skillListQuest--isAvailable'
      }  ${
        user.admin?.userType !== 'teacher' &&
        isCurrent &&
        'skillListQuest--isCurrent'
      }`}
    >
      {!!(user.admin?.userType !== 'teacher' && isAvailable && !hasCurrent) && (
        <button
          className={`skillListQuest__overlay ${
            user.admin?.userType !== 'teacher' &&
            isAvailable &&
            !isCurrent &&
            'skillListQuest--isAvailable'
          }}`}
          onClick={() => {
            setCurrentQuest()
          }}
        >
          START
        </button>
      )}
      <div className="skillListQuest__head">
        <h3 className="skillListQuest__title m-title-stroke-white">{`Quest ${
          index + 1
        } - ${quest.name}`}</h3>
        <h3 className="skillListQuest__check m-title-stroke-white">
          {completed && '✔'}
        </h3>

        {user.admin?.userType !== 'teacher' && isCurrent && (
          <h5 className="skillListQuest__inProgress m-title-stroke-white">
            {' '}
            In Progress...
          </h5>
        )}

        {teacherView && (
          <div className="skillListQuest__skillListButtons m-flex">

            <button
              className="m-skillListButton button"
              type="button"
              onClick={() => {
                setModalOpen(true)
                setModalContent(
                  <ModalQuestEdit
                    prevLevel={prevLevel}
                    defaultName={quest.name}
                    defaultParents={levelIndex !== 0 && parents}
                    descendants={descendants}
                    addChild={addChild}
                    handleSubmit={(e) => {
                      e.preventDefault()

                      // get input vals
                      const nameInput = e.target[0]
                      const nameVal = nameInput.value
                      const parentInput = e.target[1]
                      const parentVal = [...parentInput.selectedOptions].map(
                        (option) => option.value
                      )

                      // dispatch
                      if (nameVal !== quest.name) {
                        dispatch({
                          type: ACTIONS.CHANGE_NAME,
                          payload: { quest, name: nameVal }
                        })
                      }
                      if (parentVal !== quest.parents) {
                        dispatch({
                          type: ACTIONS.SET_PARENTS,
                          payload: { quest, parentIds: parentVal }
                        })
                      }

                      // close modal
                      setModalOpen(false)
                    }}
                  />
                )
              }}
            >
              Edit
            </button>

            {levelIndex !== 0 && teacherView && (
              <button
                className="m-skillListButton button"
                type="button"
                onClick={() => {
                  dispatch({
                    type: ACTIONS.DELETE_ITEM,
                    payload: { item: quest }
                  })
                }}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
      <div className="m-flex">
        <div className="m-flexColumn">
          {parents != null &&
            parents.map((p) => (
              <div
                className="skillListQuest__family m-title-stroke-black"
                key={p.id}
                style={{ backgroundColor: p.color }}
              >
                {`BEFORE: ${p.name}`}
              </div>
            ))}
        </div>

        <div className="m-flexColumn">
          {descendants != null &&
            descendants.map((d) => (
              <div
                className="skillListQuest__family m-title-stroke-black"
                key={d.id}
                style={{ backgroundColor: d.color }}
              >
                {`NEXT LESSON: ${d.name}`}
              </div>
            ))}
        </div>
      </div>

      {quest.skills.map((skill, index) => (
        <SkillListSkill
          key={skill + ' ' + index}
          quest={quest}
          skill={skill}
          index={index}
          teacherView={teacherView}
        />
      ))}

      {quest.skills.length < SETTINGS.MAX_SKILLS && teacherView && (
        <button
          className="m-skillListButton button"
          type="button"
          onClick={() => {
            setModalOpen(true)
            setModalContent(
              <ModalSkillAdd
                skillList={quest.skills}
                handleSubmit={(e) => {
                  e.preventDefault()
                  const nameInput = e.target[0]
                  const nameVal = nameInput.value
                  dispatch({
                    type: ACTIONS.ADD_SKILL,
                    payload: { quest, skill: nameVal }
                  })
                  setModalOpen(false)
                }}
              />
            )
          }}
        >
          Add New Skill
        </button>
      )}
    </div>
  ) : null
}

SkillListQuest.propTypes = {
  index: PropTypes.number,
  levelIndex: PropTypes.number,
  quest: PropTypes.object,
  teacherView: PropTypes.bool
}
