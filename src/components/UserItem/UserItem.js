import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { DataContext } from 'contexts/DataContext'
import { capitalize } from 'utils/string'

export default function UserItem ({ userData }) {
  // const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { dispatch, ACTIONS } = useContext(DataContext)
  const [amount, setAmount] = useState(0)
  const [done, setDone] = useState(false)
  const [prev, setPrev] = useState('')
  const [loading, setLoading] = useState(false)

  // function checkCooldownTime (updatedAt) {
  //   if (updatedAt === null) return 0
  //   const updatedAtDate = new Date(updatedAt)
  //   const currentDate = new Date()

  //   // calculate the time difference in milliseconds
  //   const timeDifferenceMs = currentDate - updatedAtDate

  //   // calculate the time difference in hours
  //   const timeDifferenceHours = timeDifferenceMs / (1000 * 60 * 60)

  //   return timeDifferenceHours >= 1 ? new Date(timeDifferenceHours).getMinutes() : 0
  // }

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

    setDone(true)

    await dispatch({
      type: ACTIONS.SAVE_LAST_STATE,
      payload: {
        userName: userData.admin.userName,
        prevData: [{ key: 'xp', value: prevXP }, { key: 'level', value: prevLVL }, { key: 'gold', value: prevGold }] // also add previous level
      }
    })
    setPrev(userData.admin.prevData)
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

    setPrev(userData.admin.prevData)
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
      {/* {!!checkCooldownTime(state.userData.admin.lastUpdated) */}
      {!!done
        ? <div>
          {/* <p>Please wait {checkCooldownTime(state.userData.admin.lastUpdated)} minutes to add xp again</p> */}
          { JSON.stringify(prev) }
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
