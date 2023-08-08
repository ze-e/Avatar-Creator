import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { DataContext } from 'contexts/DataContext'
import { capitalize } from 'utils/string'

export default function UserItem ({ userData }) {
  const { dispatch, ACTIONS } = useContext(DataContext)
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [cooldownOn, setCooldownOn] = useState(true)

  const checkCooldownTime = (updatedAt, cooldownTime = 10) => {
    const currentTime = new Date()
    const timeDifferenceInMs = currentTime - updatedAt
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInMs / (1000 * 60))

    if (timeDifferenceInMinutes >= cooldownTime) {
      return timeDifferenceInMinutes - cooldownTime
    } else {
      return 0
    }
  }

  const checkCooldownAndUpdate = () => {
    const timeDifference = checkCooldownTime(userData.admin.lastUpdated)
    if (timeDifference > 0) {
      setTimeout(checkCooldownAndUpdate, 60000) // Wait for 1 minute (60,000 milliseconds) and call the function again.
    } else {
      setCooldownOn(false) // Cooldown time is over, set cooldownOn to false.
    }
  }

  useEffect(() => {
    if (cooldownOn) {
      checkCooldownAndUpdate()
    }
  }, [cooldownOn])

  async function gainXP (amount) {
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
  }

  function getDisplayData () {
    const include = ['name', 'level', 'xp', 'gold']
    return Object.entries(userData.data)
      .map(d => { return { key: d[0], value: d[1] } })
      .filter((i) => include.includes(i.key))
  }

  const displayData = getDisplayData()

  return (
    <div>
      <div className={'userListView__labelList'}>
        {displayData.map(k => <em className={'userListView__label'} key={k.key}>{capitalize(k.key)}</em>)}
      </div>
      <div className={'userListView__valueList'}>
          {displayData.map((v, i) => <p className={'userListView__value'} key={i}>{v.value}</p>)}
      </div>
      {!!checkCooldownAndUpdate
        ? <div>
          <p>Please wait {checkCooldownAndUpdate} minutes to add xp again</p>
          <button
            type="button"
            onClick={() => { if (!loading) undo(['xp', 'gold', 'level']) }}
          >Undo</button>
        </div>
        : <>
          <input value={amount} onChange={(e) => setAmount(e.target.value)}/>
          <button
            type="button"
            onClick={() => { if (!loading) gainXP(amount) }}
          >
            Add XP
          </button>
        </>
      }
    </div>
  )
}

UserItem.propTypes = {
  userData: PropTypes.object.isRequired
}
