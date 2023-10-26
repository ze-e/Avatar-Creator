import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from './Avatar/Avatar'
import ProfileInfo from './Profile/ProfileInfo'
import { UserApi } from 'api'
import { getFullName, getUserDisplayLevel, getUserSubtitle } from 'utils/user'

export default function PublicProfileView () {
  const { userId } = useParams()
  const [user, setUser] = useState({})

  async function getUserById (userId) {
    const userData = await UserApi.getUserById(userId)
    if (userData) setUser(userData)
    else {
      console.error('could not retrieve user')
    }
  }

  useEffect(() => { getUserById(userId) }, [userId])

  return (
    <>
      {user ? (
        <div className="profileView">
          {user.data && (
            <div className="profileView__img">
              <Avatar
                fullName={getFullName(user.data)}
                userSubtitle={getUserSubtitle(user.data)}
                userLevel={getUserDisplayLevel(user.data)}
                userType={user.admin.userType}
                avatar={user.data.avatar}
                gear={user.data.gear}
                userId={user._id}
              />{' '}
            </div>
          )}
          <div className="profileView__info">
            {user.data && (
            // <div className="profileView__info">
              <ProfileInfo data={user.data} publicView={true} />
            // </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
