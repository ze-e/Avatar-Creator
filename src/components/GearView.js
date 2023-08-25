import React, { useContext } from 'react'
import Avatar from './Avatar/Avatar'

import GearInfo from './Gear/GearInfo'
import { Outlet } from 'react-router-dom'
import { UserContext } from 'contexts/UserContext'
import { getFullName, getUserDisplayLevel, getUserSubtitle } from 'utils/user'

export default function GearView () {
  const { user } = useContext(UserContext)
  return (
    <div className="gearView">
      <div className="gearView__top">
        {user.data && (
          <div className="gearView__img">
            <Avatar
              fullName={getFullName(user.data)}
              userSubtitle={getUserSubtitle(user.data)}
              userLevel={getUserDisplayLevel(user.data)}
              userType={user.admin.userType}
              avatar={user.data.avatar}
              gear={user.data.gear}
              userId={user._id}
            />
          </div>
        )}
        <div className="gearView__info">
          {user.data && (
            <div className="gearView__info">
              <GearInfo />
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  )
}
