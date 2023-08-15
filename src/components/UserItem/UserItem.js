import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { DataContext } from 'contexts/DataContext'
import { capitalize, checkPlural } from 'utils/string'

export default function UserItem ({ userData }) {
  const { dispatch, ACTIONS } = useContext(DataContext)
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  // cooldown
  const [cooldownTime, setCooldownTime] = useState(0)
  const [coolDownFunc, setCoolDownFunc] = useState(null)

  const checkCooldownTime = (updatedAt, cooldownTime = 2) => {
    const timeDifferenceInMs = (new Date().getMinutes() - new Date(updatedAt).getMinutes())
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
    setLoading(true)
    const prevXP = userData.data.xp
    const prevGold = userData.data.gold
    const prevLVL = userData.data.level
    await dispatch({
      type: ACTIONS.GAIN_XP,
      payload: {
        userName: userData.admin.userName,
        amount
      }
    })

    await dispatch({
      type: ACTIONS.SAVE_LAST_STATE,
      payload: {
        userName: userData.admin.userName,
        prevData: [{ key: 'xp', value: prevXP }, { key: 'level', value: prevLVL }, { key: 'gold', value: prevGold }] // also add previous level
      }
    })
    setLoading(false)
    setAmount(0)
    checkCooldownAndUpdate()
  }

  async function undo (key) {
    setLoading(true)
    await dispatch({
      type: ACTIONS.UNDO,
      payload: {
        userName: userData.admin.userName,
        key
      }
    })

    setLoading(false)
    setCooldownTime(0)
    clearTimeout(coolDownFunc)
    setCoolDownFunc(null)
  }

  function getDisplayData () {
    const include = ['name', 'level', 'xp', 'gold']
    return Object.entries(userData.data)
      .map(d => { return { key: d[0], value: d[1] } })
      .filter((i) => include.includes(i.key))
  }

  const displayData = getDisplayData()

  useEffect(() => {
    if (userData.admin.lastUpdated !== null) checkCooldownAndUpdate()
  }, [])

  return (
    <div>
      <div className={'userListView__labelList'}>
        {displayData.map(k => <em className={'userListView__label'} key={k.key}>{capitalize(k.key)}</em>)}
      </div>
      <div className={'userListView__valueList'}>
          {displayData.map((v, i) => <p className={'userListView__value'} key={i}>{v.value}</p>)}
      </div>
      {cooldownTime > 0
        ? <div>
          <p>Please wait {cooldownTime} {checkPlural('minute', cooldownTime)} to add xp again</p>
          <button
            type="button"
            onClick={() => { if (!loading) undo(['xp', 'gold', 'level']) }}
          >Undo</button>
        </div>
        : <form onSubmit={(e) => { handleSubmit(e, amount) }}>
            <input type='number' min={1} max={100} value={amount} onChange={(e) => setAmount(e.target.value)}/>
            <button
              type="submit"
            >
              Add XP
          </button>
        </form>
      }
    </div>
  )
}

UserItem.propTypes = {
  userData: PropTypes.object.isRequired
}
