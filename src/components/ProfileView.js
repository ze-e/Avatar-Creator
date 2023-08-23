import React, { useContext } from 'react'
import Avatar from './Avatar/Avatar'

import ProfileInfo from './Profile/ProfileInfo'

import { UserContext } from 'contexts/UserContext'
import { getFullName, getUserDisplayLevel, getUserSubtitle } from 'utils/user'

export default function ProfileView () {
  const { user } = useContext(UserContext)

  return (
    <>
      <div className="profileView">
        {user.data && (
          <div className="profileView__img">
            <Avatar
              fullName={getFullName(user.data)}
              userSubtitle={getUserSubtitle(user.data)}
              userLevel={getUserDisplayLevel(user.data)}
              avatar={user.data.avatar}
              gear={user.data.gear}
              userId={user._id}
            />
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
