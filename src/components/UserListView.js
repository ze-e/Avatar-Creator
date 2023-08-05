/* eslint-disable react/prop-types */
// import React, { useContext, useState, useEffect } from 'react'
import React, { useContext } from 'react'
import { DataContext } from 'contexts/DataContext'

export default function UserListView () {
  // const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { state } = useContext(DataContext)

  // const [inputValue, setInputValue] = useState(0);

  // useEffect(() => {
  //   setInputValue(state.userData.data.xp)
  // }, [state.userData.data]);

  function userData () {
    const include = ['name', 'level', 'xp', 'gold']
    const data = state.userData.map(i => i.data)
    return data.map(i => Object.entries(i)
      .map(j => { return { key: j[0], value: j[1] } })
      .filter((i) => include.includes(i.key)))
  }

  // function UserElement ({ userData }) {
  //   return (
  //     <>
  //       <em>{userData.key}</em> - <span>{userData.value}</span>
  //       {/* <input type='text' placeholder='Amount of XP to add'>{inputValue}</input> */}
  //       {/* <button onClick={() => console.log('add xp')}>Add XP</button> */}
  //     </>
  //   )
  // }

  return (
    <ul>
      {
        userData().map((u, i) =>
          <li key={i}>
            {u.map(k => <em key={k.key}>{k.key}</em>)}
            {u.map(v => <p key={v.value}>{v.value}</p>)}
          </li>
        )
      }
    </ul>
  )
}
