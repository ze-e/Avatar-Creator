import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from './Avatar/Avatar'
import ProfileInfo from './Profile/ProfileInfo'
import { UserApi } from 'api'

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
      {user ? <div className="profileView">
        {user.data && (
          <div className="profileView__img">
            <Avatar user={user} avatar={user.data.avatar} gear={user.data.gear} />
          </div>
        )}
        <div className="profileView__info">
          {user.data && (
            <div className="profileView__info">
              <ProfileInfo data={user.data} publicView={true} />
            </div>
          )}
        </div>
      </div> : <p>Loading...</p>}
    </>
  )
}
