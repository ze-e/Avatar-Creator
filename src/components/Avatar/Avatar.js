import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { drawAvatarFull } from 'utils/visualEffect'
import { getAvatarData, getGearData } from 'utils/avatar'
import { DataContext } from 'contexts/DataContext'
import { UserContext } from 'contexts/UserContext'
import Badge from 'components/Badge/Badge'
import { ModalContext } from 'contexts/ModalContext'
import { ModalShare } from 'components/Modal/ModalTypes'

export default function Avatar ({ avatar, gear, edit }) {
  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { user } = useContext(UserContext)
  const { setModalOpen, setModalContent } = useContext(ModalContext)

  useEffect(() => {
    drawAvatarFull({
      avatar: getAvatarData(state.avatarData, 'full', avatar),
      gear: gear ? getGearData(state.itemData, Object.values(gear)) : null
    })
  }, [avatar, state.userData])

  const openShareModal = () => {
    setModalOpen(true)
    setModalContent(<ModalShare />)
  }

  return (
    <div className="avatar">
      <canvas id="canvas"></canvas>
      <div className='m-abs-upper-right'>
        <button className='button' onClick={openShareModal}>🔗</button>
      </div>
      <div className='m-abs-lower-left'>
          <Badge>
            <p className='badge__text_bold'><strong>{user.data.name} the { user.data.epiphet}</strong></p>
            <p className='badge__text_normal'>Lv.{user.data.level} {' '} { user.data.type} {' '} { user.data.job}</p>
          </Badge>
        </div>
        <div className='m-abs-lower-right'>
          <Badge>
            <p className='m-title-stoke-white'>Lv.{user.data.level}</p>
          </Badge>
        </div>

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
