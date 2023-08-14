import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { drawAvatarFull } from 'utils/visualEffect'
import { getAvatarData, getGearData } from 'utils/avatar'
import { DataContext } from 'contexts/DataContext'
import { UserContext } from 'contexts/UserContext'
import Badge from 'components/Badge/Badge'
import { ModalContext } from 'contexts/ModalContext'
import { ModalShare } from 'components/Modal/ModalTypes'
import { NavLink } from 'react-router-dom'

export default function Avatar ({ avatar, gear, edit }) {
  const { state } = useContext(DataContext)
  const { user } = useContext(UserContext)
  const { setModalOpen, setModalContent, setModalStyle } = useContext(ModalContext)

  useEffect(() => {
    drawAvatarFull({
      avatar: getAvatarData(state.avatarData, 'full', avatar),
      gear: gear ? getGearData(state.itemData, Object.values(gear)) : null
    })
  }, [avatar, state])

  const openShareModal = () => {
    setModalOpen(true)
    setModalStyle('small')
    setModalContent(<ModalShare />)
  }

  return (
    <div className="avatar">
      <canvas id="canvas"></canvas>
      {!!edit &&
        (<div className='m-abs-upper-left'>
          <NavLink
            className={`mainNav__link m-navLink ${(isActive) =>
              isActive && 'active'}`}
            to="profile"
          >
            <button className="m-button">Edit </button>
          </NavLink>
        </div>)
      }
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
    </div>
  )
}

Avatar.propTypes = {
  avatar: PropTypes.number,
  gear: PropTypes.object,
  edit: PropTypes.bool
}
