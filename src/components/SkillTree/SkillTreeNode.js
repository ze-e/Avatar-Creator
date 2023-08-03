import React, { useEffect, useContext, useState, useRef } from 'react'

import PropTypes from 'prop-types'
import { DataContext } from 'contexts/DataContext'
import { UserContext } from 'contexts/UserContext'

import { drawHex } from 'utils/visualEffect'
import { createDarkVariation } from 'utils/color'

export default function SkillTreeNode ({ item }) {
  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { user, setUser } = useContext(UserContext)
  const hexRef = useRef(null)
  const xp = item.skills.length * 10
  const completed =
    user.admin?.userType === 'student' &&
    user.admin?.completedQuests.includes(item.id)
  const hasCurrent =
    user.admin?.userType === 'student' && user.admin?.currentQuest

  const [isAvailable, setIsAvailable] = useState(false)
  const [isCurrent, setIsCurrent] = useState(false)

  useEffect(() => {
    if (
      !completed &&
      (!item.parents.length > 0 ||
        item.parents.every((p) => user.admin.completedQuests.includes(p)))
    ) setIsAvailable(true)
    else setIsAvailable(false)
  }, [user.admin])

  useEffect(() => {
    setIsCurrent(!completed && item.id === user.admin.currentQuest)
  }, [user.admin])

  useEffect(() => {
    drawHex({
      svg: hexRef.current,
      color: item.color,
      bgImage: item.img,
      borderColor: isCurrent ? '#ffffff' : createDarkVariation(item.color),
      borderWidth: '100',
      dropShadow: !!(isCurrent || completed),
      glow: !!isAvailable,
      innerShadow: !isAvailable && !isCurrent && !completed && true,
      teacherview: Boolean(user.admin?.userType !== 'teacher')
    })
  }, [hexRef, item, isCurrent, user.admin])

  async function setCurrentQuest () {
    await dispatch({
      type: ACTIONS.EDIT_ADMIN,
      payload: {
        userName: user.admin.userName,
        field: 'currentQuest',
        newVal: item.id
      }
    })
    const userData = state.userData.find(
      (i) =>
        i.admin.userName.toLowerCase() === user.admin.userName.toLowerCase()
    )
    setUser(userData)
  }

  return (
    <div className={`skillTreeNodeContainer key-${item.id}`} data-id={item.id}>
      <div
        className={`skillTreeNode ${
          !!isAvailable && !hasCurrent && 'current'
        } ${Boolean(user.admin?.userType === 'teacher') && 'teacher'}`}
      >
        {Boolean(user.admin?.userType !== 'teacher') &&
          isAvailable &&
          !hasCurrent && (
            <button
              className={'skillTreeNode__button'}
              type="button"
              onClick={() => {
                setCurrentQuest()
              }}
            >
              <span className={'skillTreeNode__overlay m-title-stroke-black'}>
                START
              </span>
            </button>
        )}

        <div
          className="skillTreeNode__svg"
          data-id={`${item.id}-svg`}
          ref={hexRef}
        ></div>
        {Boolean(user.admin?.userType === 'teacher') ||
        !!completed ||
        !!isAvailable ? (
          <>
            <h3
              className={`skillTreeNode__text ${
                !!isCurrent && Boolean(user.admin?.userType !== 'teacher')
                  ? 'current m-title-stroke-white'
                  : 'm-title-stroke-black'
              }`}
            >
              {item.name}
            </h3>
            <h4
              className={`skillTreeNode__xp ${
                !!isCurrent && Boolean(user.admin?.userType !== 'teacher')
                  ? 'current m-title-stroke-white'
                  : 'm-title-stroke-black'
              }`}
            >
              XP: {xp}
            </h4>
          </>
            ) : (
            <div className={'skillTreeNode__blank'}></div>
            )}
      </div>
    </div>
  )
}

SkillTreeNode.propTypes = {
  item: PropTypes.object,
  children: PropTypes.node
}
