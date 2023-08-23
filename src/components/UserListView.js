import React, { useState, useEffect } from 'react'
import UserItem from './UserItem/UserItem'
import { UserApi } from 'api'

export default function UserListView () {
  const [users, setUsers] = useState({})

  async function getUsers () {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      try {
        const res = await UserApi.getUsersAdmin(token)
        if (res?.data) {
          const userData = res.data
          setUsers(userData)
        }
      } catch (e) {
        console.log(`Error getting users: ${e}`)
      }
    }
  }

  useEffect(() => { getUsers() }, [])

  return (
    <ul>
      {
        users.length > 0 ? users.filter(i => i.admin.userType !== 'admin').map(u =>
          <li key={u.admin.userName} className={'userListView__listItem'}>
            <UserItem userData={u} />
          </li>
        )
          : <p>Loading...</p>}
    </ul>
  )
}
