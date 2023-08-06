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
    const prevXP = userData.data.xp
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
        prevData: [{ key: 'xp', value: prevXP }, { key: 'level', value: prevLVL }], // also add previous level
        admin: true
      }
    })
    setPrev(userData.admin.prevData)
  }

  // async function undo () {
  //   await dispatch({
  //     type: ACTIONS.UNDO,
  //     payload: {
  //       userName: user.admin.userName,
  //       key: 'xp'
  //     }
  //   })
  // }

  function getUserData () {
    const include = ['name', 'level', 'xp', 'gold']
    return Object.entries(userData.data)
      .map(d => { return { key: d[0], value: d[1] } })
      .filter((i) => include.includes(i.key))
  }

  const user = getUserData()

  return (
    <div>
      <div className={'userListView__labelList'}>
        {user.map(k => <em className={'userListView__label'} key={k.key}>{capitalize(k.key)}</em>)}
      </div>
      <div className={'userListView__valueList'}>
          {user.map(v => <p className={'userListView__value'} key={v.value}>{v.value}</p>)}
      </div>
      {/* {!!checkCooldownTime(state.userData.admin.lastUpdated) */}
      {!!done
        ? <div>
          {/* <p>Please wait {checkCooldownTime(state.userData.admin.lastUpdated)} minutes to add xp again</p>
          <button
            type="button"
            onClick={() => undo('xp')}
          >Undo</button> */}
          {JSON.stringify(prev)}
        </div>
        : <>
          <input value={amount} onChange={(e) => setAmount(e.target.value)}/>
          <button
            type="button"
            onClick={() => gainXP(amount)}
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
