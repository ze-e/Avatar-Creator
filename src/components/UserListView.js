import React, { useContext } from 'react'
import { DataContext } from 'contexts/DataContext'
import UserItem from './UserItem/UserItem'

export default function UserListView () {
  const { state } = useContext(DataContext)

  return (
    <ul>
      {
        state.userData.map((u, i) =>
          <li key={i} className={'userListView__listItem'}>
            <UserItem userData={u} />
          </li>
        )
      }
    </ul>
  )
}
