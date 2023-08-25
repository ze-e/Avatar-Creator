import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { capitalize, checkPlural } from 'utils/string'
import { TeacherApi } from 'api'
import SETTINGS from 'config/constants'
export default function UserItem ({ teacherData, userData, reload, isStudentOfTeacher }) {
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  // cooldown
  const [cooldownTime, setCooldownTime] = useState(0)
  const [coolDownFunc, setCoolDownFunc] = useState(null)

  const checkCooldownTime = (updatedAt, cooldownTime = SETTINGS.UNDO_TIME) => {
    const timeDifferenceInMs =
      new Date().getMinutes() - new Date(updatedAt).getMinutes()
    const timeToUndoOver = cooldownTime - timeDifferenceInMs
    if (timeToUndoOver <= cooldownTime) {
      return timeToUndoOver
    } else {
      return 0
    }
  }

  const checkCooldownAndUpdate = () => {
    const timeDifference = checkCooldownTime(userData.admin.lastUpdated)
    setCooldownTime(timeDifference)
    if (timeDifference > 0) {
      const cooldown = setTimeout(checkCooldownAndUpdate, 60000) // Wait for 1 minute (60,000 milliseconds) and call the function again.
      setCoolDownFunc(cooldown)
    }
  }

  async function handleSubmit (e, amount) {
    e.preventDefault()
    if (e.target.checkValidity() === false) return
    if (loading) return
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      setLoading(true)
      try {
        await TeacherApi.gainXP(token, userData._id, { amount })
        setAmount(0)
        checkCooldownAndUpdate()
        reload()
      } catch (e) {
        console.log(`error adding xp ${e}`)
      }
      setLoading(false)
    }
  }

  async function undo (key) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      setLoading(true)
      try {
        await TeacherApi.undo(token, userData._id, { key })
        setLoading(false)
        setCooldownTime(0)
        clearTimeout(coolDownFunc)
        setCoolDownFunc(null)
        reload()
      } catch (e) {
        console.log(`error during undo ${e}`)
      }
    }
  }

  async function addStudent () {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      setLoading(true)
      try {
        await TeacherApi.addStudent(token, userData._id, { teacherId: teacherData._id })
        setLoading(false)
        reload()
      } catch (e) {
        console.log(`error during add student ${e}`)
      }
    }
  }

  async function removeStudent () {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      setLoading(true)
      try {
        await TeacherApi.removeStudent(token, userData._id, {
          teacherId: teacherData._id
        })
        setLoading(false)
        reload()
      } catch (e) {
        console.log(`error during remove student ${e}`)
      }
    }
  }

  function getDisplayData () {
    const include = ['name', 'level', 'xp', 'gold']
    return Object.entries(userData.data)
      .map((d) => {
        return { key: d[0], value: d[1] }
      })
      .filter((i) => include.includes(i.key))
  }

  const displayData = getDisplayData()

  useEffect(() => {
    if (userData.admin.lastUpdated !== null) checkCooldownAndUpdate()
  }, [userData.admin.lastUpdated])

  return (
    <div>
      <div className={'userListView__labelList'}>
        {displayData.map((k) => (
          <em className={'userListView__label'} key={k.key}>
            {capitalize(k.key)}
          </em>
        ))}
      </div>
      <div className={'userListView__valueList'}>
        {displayData.map((v, i) => (
          <p className={'userListView__value'} key={i}>
            {v.value}
          </p>
        ))}
      </div>
      {Boolean(cooldownTime > 0 && userData.admin.userType === 'user') ? (
        <div>
          <p>
            Please wait{' '}
            {cooldownTime > 60 ? Math.round(cooldownTime / 60) : cooldownTime}{' '}
            {cooldownTime > 60
              ? checkPlural('hour', Math.round(cooldownTime / 60))
              : checkPlural('minute', cooldownTime)}{' '}
            to add xp again
          </p>
          <button
            type='button'
            disabled={loading}
            onClick={() => {
              if (!loading) undo(['xp', 'gold', 'level'])
            }}
          >
            {!loading ? 'Undo' : 'Loading...'}
          </button>
        </div>
      ) : (
        <>
          <form
            className='m-flex'
            onSubmit={(e) => {
              handleSubmit(e, amount)
            }}
          >
            <input
              type='number'
              min={1}
              max={100}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button type='submit' disabled={loading}>
              {!loading ? 'Add XP' : 'Loading...'}
            </button>
          </form>
          {isStudentOfTeacher ? (
            <button
              className='m-button'
              type='button'
              disabled={loading}
              onClick={removeStudent}
            >
              {!loading ? 'Remove from students' : 'Loading...'}
            </button>
          ) : (
            <button type='button' disabled={loading} onClick={addStudent}>
              {!loading ? 'Add to students' : 'Loading...'}
            </button>
          )}
        </>
      )}
    </div>
  )
}

UserItem.propTypes = {
  teacherData: PropTypes.object,
  userData: PropTypes.object.isRequired,
  reload: PropTypes.func,
  isStudentOfTeacher: PropTypes.bool
}
