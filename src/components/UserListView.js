import React, { useState, useEffect, useContext } from 'react'
import UserItem from './UserItem/UserItem'
import { UserApi } from 'api'
import { UserContext } from 'contexts/UserContext'

export default function UserListView () {
  const [users, setUsers] = useState({})
  const [studentfilter, setStudentfilter] = useState(false)
  const { user } = useContext(UserContext)

  async function getUsers () {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      try {
        const res = await UserApi.getUsers(token)
        if (res?.data) {
          const userData = res.data
          setUsers(userData)
        }
      } catch (e) {
        console.log(`Error getting users: ${e}`)
      }
    }
  }

  useEffect(() => { getUsers() }, [users])

  return (
    <>
      <div className='m-flex'>
        <label htmlFor='studentFilter'>
          Show {studentfilter ? 'all users' : 'only my students'}
        </label>
        {user.userType === 'teacher' && (
          <input
            type='checkbox'
            checked={studentfilter}
            onChange={() => setStudentfilter(!studentfilter)}
          />
        )}
      </div>
      <ul>
        {users.length > 0 ? (
          users
            .filter((i) =>
              studentfilter
                ? i.admin.userType === 'user' &&
                  user.teacherData?.students.includes(i._id)
                : i.admin.userType === 'user'
            )
            .map((u) => (
              <li key={u.admin.userName} className={'userListView__listItem'}>
                <UserItem
                  teacherData={user}
                  userData={u}
                  reload={getUsers}
                  isStudentOfTeacher={
                    user.userType === 'teacher' &&
                    u.admin.userType === 'user' &&
                    user.teacherData?.students.includes(u._id)
                  }
                />
              </li>
            ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </>
  );
}
