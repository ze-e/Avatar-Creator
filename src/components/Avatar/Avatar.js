import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { drawAvatarFull } from 'utils/visualEffect'
import { getAvatarData, getGearData } from 'utils/avatar'
import { DataContext } from 'contexts/DataContext'
// import { ModalContext } from 'contexts/ModalContext'
// import { ModalShare } from 'components/Modal/ModalTypes'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Avatar ({ avatar, user, gear, edit }) {
  const { state } = useContext(DataContext)
  const [loading, setLoading] = useState(true)
  // const { setModalOpen, setModalContent, setModalStyle } = useContext(ModalContext)
  const navigate = useNavigate()

  const fullName = user?.data.name + ' the ' + user?.data.epiphet

  useEffect(() => {
    setLoading(true)
    drawAvatarFull({
      avatar: getAvatarData(state.avatarData, 'full', avatar),
      gear: gear ? getGearData(state.itemData, Object.values(gear)) : null,
      title: fullName,
      subtitle: 'Lv ' + user?.data.level + ' ' + user?.data.type + ' ' + user?.data.job,
      level: 'Lv ' + user?.data.level
    })
    setLoading(false)
  }, [avatar, state, gear, user])

  // const openShareModal = () => {
  //   setModalOpen(true)
  //   setModalStyle('small')
  //   const canvas = document.querySelector('canvas')
  //   const data = canvas.toDataURL('image/png')
  //   setModalContent(<ModalShare imageLink={data} imageName={fullName} />)
  // }

  const share = () => {
    const userId = user?._id
    const routeURL = `${window.location.origin}/user/${userId}`

    navigator.clipboard
      .writeText(routeURL)
      .then(() => {
        alert('Profile copied to clipboard')
        navigate(`/user/${userId}`)
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error)
      })
  }

  async function downloadImage () {
    const canvas = document.querySelector('canvas')
    const data = canvas.toDataURL('image/png')
    const name = user?.data.name + ' the ' + user?.data.epiphet
    const image = await fetch(data)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      {Boolean(user && !loading) ? (
        <div className="avatar">
          <canvas id="canvas"></canvas>
          {!!edit && (
            <div className="m-abs-upper-left">
              <NavLink
                className={`mainNav__link m-navLink ${(isActive) =>
                  isActive && 'active'}`}
                to="profile"
              >
                <button className="m-button">Edit </button>
              </NavLink>
            </div>
          )}
          <div className="m-abs-upper-right">
            {/* <button className="button" onClick={openShareModal}>
          🔗
        </button> */}
            <button onClick={share}>🔗</button>
          </div>
          <div className="m-flexCenter">
            <button className="m-button" onClick={downloadImage}>
              Download Image
            </button>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  )
}

Avatar.propTypes = {
  avatar: PropTypes.number,
  gear: PropTypes.object,
  user: PropTypes.object,
  edit: PropTypes.bool
}
