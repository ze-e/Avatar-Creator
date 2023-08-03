import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { drawAvatar } from 'utils/visualEffect'
import { getAvatarData, getGearData } from 'utils/avatar'
import { DataContext } from 'contexts/DataContext'

import { useNavigate } from 'react-router-dom'

export default function Avatar ({ avatar, gear, edit }) {
  const { state } = useContext(DataContext)

  const navigate = useNavigate()

  useEffect(() => {
    drawAvatar({
      body: getAvatarData(state.avatarData, 'body', avatar.body),
      head: getAvatarData(state.avatarData, 'head', avatar.head),
      hand: getAvatarData(state.avatarData, 'hand', avatar.hand),
      foot: getAvatarData(state.avatarData, 'foot', avatar.foot),
      gear: gear ? getGearData(state.itemData, Object.values(gear)) : null
    })
  }, [avatar, state.userData])

  return (
    <div className="avatar">
      <canvas id="canvas" style={{ border: '2px solid black' }}></canvas>
      {edit && (
        <button
          className="avatar__edit m-button"
          type="button"
          onClick={() => {
            navigate('/editAvatar')
          }}
        >
          Edit Avatar
        </button>
      )}
    </div>
  )
}

Avatar.propTypes = {
  avatar: PropTypes.object,
  gear: PropTypes.object,
  edit: PropTypes.bool
}
