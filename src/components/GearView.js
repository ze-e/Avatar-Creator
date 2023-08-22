import React, { useContext } from 'react'
import Avatar from './Avatar/Avatar'

import GearInfo from './Gear/GearInfo'
import { Outlet } from 'react-router-dom'
import { UserContext } from 'contexts/UserContext'

export default function GearView () {
  const { user } = useContext(UserContext)
  return (
    <div className="gearView">
      <div className="gearView__top">
        {user.data && (
          <div className="gearView__img">
            <Avatar user={user} avatar={user.data.avatar} gear={user.data.gear} />
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
