import React from 'react'
import PropTypes from 'prop-types'

export default function UserItem ({ userData }) {
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
        {user.map(k => <em className={'userListView__label'} key={k.key}>{k.key}</em>)}
      </div>
      <div className={'userListView__valueList'}>
          {user.map(v => <p className={'userListView__value'} key={v.value}>{v.value}</p>)}
      </div>
      {/* {!!coolDown ? <div><p>Please wait { minutes } to add xp again</p> <button onClick={() => console.log('undo')}>Undo</button> </div> : <button onClick={() => console.log('Add XP')}>Add XP</button>} */}
    </div>
  )
}

UserItem.propTypes = {
  userData: PropTypes.arrayOf(PropTypes.object).isRequired
}
