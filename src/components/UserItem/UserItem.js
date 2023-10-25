import React, { useState, useEffect, useContext } from 'react'
import { ModalContext } from 'contexts/ModalContext'
import { ModalBadge } from 'components/Modal/ModalTypes'
import PropTypes from 'prop-types'
import { capitalize, checkPlural } from 'utils/string'
import { UserApi, TeacherApi } from 'api'
import SETTINGS from 'config/constants'
import { DataContext } from 'contexts/DataContext'
import { getBadgeData } from 'utils/badge'
export default function UserItem ({ userId, teacherData }) {
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({})
  const { setModalOpen, setModalContent } = useContext(ModalContext)
  const { state } = useContext(DataContext)

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
    const timeDifference = checkCooldownTime(userData?.admin?.lastUpdated)
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
        await TeacherApi.gainXP(
          token,
          userData._id,
          { amount },
          {
            teacherId: teacherData?._id
          }
        )
        setAmount(0)
        checkCooldownAndUpdate()
        loadUser()
      } catch (e) {
        console.log(`error adding xp ${e}`)
      }
      setLoading(false)
    }
  }

  async function loadUser () {
    setUserData({})
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      setLoading(true)
      try {
        const res = await UserApi.getUserById(userId)
        setUserData(res)
        setLoading(false)
      } catch (e) {
        console.log(`error loading user ${e}`)
      }
    }
  }

  async function undo (key) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      setLoading(true)
      try {
        await TeacherApi.undo(
          token,
          userData._id,
          { key },
          {
            teacherId: teacherData?._id
          }
        )
        setLoading(false)
        setCooldownTime(0)
        clearTimeout(coolDownFunc)
        setCoolDownFunc(null)
        loadUser()
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
        await TeacherApi.addStudent(token, userData._id, {
          teacherId: teacherData?._id
        })
        setLoading(false)
      } catch (e) {
        console.log(`error during add student ${e}`)
      }
    }
    loadUser()
  }

  async function removeStudent () {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      setLoading(true)
      try {
        await TeacherApi.removeStudent(token, userData._id, {
          teacherId: teacherData?._id
        })
        setLoading(false)
      } catch (e) {
        console.log(`error during remove student ${e}`)
      }
    }
    loadUser()
  }

  function getDisplayData () {
    if (!userData?.data) return null
    else {
      const include = ['name', 'level', 'xp', 'gold']
      return Object.entries(userData.data)
        .map((d) => {
          return { key: d[0], value: d[1] }
        })
        .filter((i) => include.includes(i.key))
    }
  }

  const displayData = getDisplayData()
  const badgeNames = userData?.data?.badges.map((b) =>
    getBadgeData(state.badgeData, b)?.name
  )

  const isStudentOfTeacher = userData?.studentData?.teacher === teacherData._id

  useEffect(() => {
    if (userData && userData?.admin?.lastUpdated !== null) checkCooldownAndUpdate()
  }, [userData?.admin?.lastUpdated])

  useEffect(() => {
    loadUser(userId)
  }, [userId])

  const renderButton = (text, onClick, loading, className) => (
    <button className={className} type='button' disabled={loading} onClick={onClick}>
      {!loading ? text : 'Loading...'}
    </button>
  )

  return (
    <div>
      {Boolean(displayData && userData) && (
        <>
          <div className={'userListView__labelList'}>
            {displayData.map((k) => (
              <em className={'userListView__label'} key={k.key}>
                {capitalize(k.key)}
              </em>
            ))}
            <em className={'userListView__label'}>Badges:</em>
          </div>
          <div className={'userListView__valueList'}>
            {displayData.map((v) => (
              <>
                <p className={'userListView__value'} key={v.key}>
                  {v.value}
                </p>
              </>
            ))}
            <p className={'userListView__value'}>{badgeNames.map((b, i) => i === badgeNames.length - 1 ? b : b + ', ')}</p>
          </div>
        </>
      )}

      {isStudentOfTeacher ? (
        renderButton('Remove from my students', removeStudent, loading)
      ) : userData?.studentData?.teacher ? (
        <p>Student is part of another class</p>
      ) : (
        renderButton('Add to my students', addStudent, loading, 'm-button')
      )}

      {Boolean(cooldownTime > 0) ? (
        <div>
          {isStudentOfTeacher && (
            <>
              <p>
                Please wait{' '}
                {cooldownTime > 60
                  ? Math.round(cooldownTime / 60)
                  : cooldownTime}{' '}
                {cooldownTime > 60
                  ? checkPlural('hour', Math.round(cooldownTime / 60))
                  : checkPlural('minute', cooldownTime)}{' '}
                to add xp again
              </p>
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  if (!loading) undo(['xp', 'gold', 'level'])
                }}
              >
                {!loading ? 'Undo' : 'Loading...'}
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {isStudentOfTeacher && (
            <>
              <form
                className="m-flex"
                onSubmit={(e) => {
                  handleSubmit(e, amount)
                }}
              >
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                  {!loading ? 'Add XP' : 'Loading...'}
                </button>
              </form>
              <button
                onClick={() => {
                  setModalOpen(true)
                  setModalContent(
                    <ModalBadge
                      userId={userData?._id}
                      userBadges={userData?.data.badges}
                      close={() => {
                        loadUser()
                        setModalOpen(false)
                        setModalContent(null)
                      }}
                    />
                  )
                }}
              >
                Add Badge
              </button>
              {userData?.data.badges.length > 0 && <button
                onClick={() => {
                  setModalOpen(true)
                  setModalContent(
                    <ModalBadge
                      userId={userData?._id}
                      userBadges={userData?.data.badges}
                      modalFunction="remove"
                      close={() => {
                        loadUser()
                        setModalOpen(false)
                        setModalContent(null)
                      }
                      }
                    />
                  )
                }}
              >
                Remove Badge
              </button>}
            </>
          )}
        </>
      )}
    </div>
  )
}

UserItem.propTypes = {
  teacherData: PropTypes.object,
  userId: PropTypes.string.isRequired
}
