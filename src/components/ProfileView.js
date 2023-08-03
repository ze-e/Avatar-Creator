import React, { useContext } from 'react'
import Avatar from './Avatar/Avatar'

import ProfileInfo from './Profile/ProfileInfo'
import CurrentQuest from './CurrentQuest/CurrentQuest'

import { UserContext } from 'contexts/UserContext'

export default function ProfileView () {
  const { user } = useContext(UserContext)

  return (
    <>
      <CurrentQuest />
      <div className="profileView">
        {user.data && (
          <div className="profileView__img">
            <Avatar avatar={user.avatar} gear={user.gear} edit={true} />
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
