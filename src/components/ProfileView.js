import React, { useContext } from 'react'
import Avatar from './Avatar/Avatar'

import ProfileInfo from './Profile/ProfileInfo'

import { UserContext } from 'contexts/UserContext'

export default function ProfileView () {
  const { user } = useContext(UserContext)

  return (
    <>
      <div className="profileView">
        {user.data && (
          <div className="profileView__img">
            <Avatar user={user} avatar={user.data.avatar} gear={user.data.gear} />
          </div>
        )}
        <div className="profileView__info">
          {user.data && (
            <div className="profileView__info">
              <ProfileInfo data={user.data} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
