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
            <Avatar avatar={user.avatar} gear={user.gear} />
          </div>
        )}
        <div className="gearView__info">
          {user.data && (
            <div className="gearView__info">
              <GearInfo data={user.data} />
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  )
}
