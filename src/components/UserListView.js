import React, { useContext } from 'react'
import { DataContext } from 'contexts/DataContext'
import UserItem from './UserItem/UserItem'

export default function UserListView () {
  const { state } = useContext(DataContext)

  return (
    <ul>
      {
        state.userData.filter(i => i.admin.userType !== 'teacher').map(u =>
          <li key={u.admin.userName} className={'userListView__listItem'}>
            <UserItem userData={u} />
          </li>
        )
      }
    </ul>
  )
}
