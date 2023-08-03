import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { drawAvatarFull } from 'utils/visualEffect'
import { getAvatarData, getGearData } from 'utils/avatar'
import { DataContext } from 'contexts/DataContext'
import { UserContext } from 'contexts/UserContext'

export default function Avatar ({ avatar, gear, edit }) {
  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    drawAvatarFull({
      avatar: getAvatarData(state.avatarData, 'full', avatar),
      gear: gear ? getGearData(state.itemData, Object.values(gear)) : null
    })
  }, [avatar, state.userData])

  return (
    <div className="avatar">
      <canvas id="canvas"></canvas>
      {edit && (
        <>
          <div className="avatar__edit">
            <button
              className="m-button"
              type="button"
              onClick={async () => {
                await dispatch({
                  type: ACTIONS.CHANGE_AVATAR,
                  payload: { userName: user.admin.userName, changeBy: -1 }
                })
              }}
            >
              ◀
            </button>
            <button
              className="m-button"
              type="button"
              onClick={async () => {
                await dispatch({
                  type: ACTIONS.CHANGE_AVATAR,
                  payload: { userName: user.admin.userName, changeBy: 1 }
                })
              }}
            >
              ▶
            </button>
          </div>
        </>
      )}
    </div>
  )
}

Avatar.propTypes = {
  avatar: PropTypes.number,
  gear: PropTypes.object,
  edit: PropTypes.bool
}
