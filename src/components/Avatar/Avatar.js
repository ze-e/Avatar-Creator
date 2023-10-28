import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { drawAvatarFull } from 'utils/visualEffect'
import { getAvatarData, getGearData } from 'utils/avatar'
import { DataContext } from 'contexts/DataContext'
// import { ModalContext } from 'contexts/ModalContext'
// import { ModalShare } from 'components/Modal/ModalTypes'
import { NavLink, useNavigate } from 'react-router-dom'
export default function Avatar ({ avatar, fullName, userSubtitle, userLevel, userType, userId, gear, edit }) {
  const { state } = useContext(DataContext)
  // const { setModalOpen, setModalContent, setModalStyle } = useContext(ModalContext)
  const navigate = useNavigate()

  const showUserType = (field, abbreviation) => userType === 'admin' ? abbreviation?.admin ? 'A' : 'Admin' : userType === 'teacher' ? abbreviation?.teacher ? 'T' : 'Teacher' : field

  const share = () => {
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

  useEffect(() => {
    if (!userId) return
    drawAvatarFull({
      canvas: document.getElementById('canvas'),
      avatar: getAvatarData(state.avatarData, 'full', avatar),
      gear: gear ? getGearData(state.itemData, Object.values(gear)) : null,
      title: fullName,
      subtitle: showUserType(userSubtitle),
      level: showUserType(userLevel, { teacher: true }),
      handleShare: share
    })
  }, [avatar, state, gear, userId])

  // const openShareModal = () => {
  //   setModalOpen(true)
  //   setModalStyle('small')
  //   const canvas = document.querySelector('canvas')
  //   const data = canvas.toDataURL('image/png')
  //   setModalContent(<ModalShare imageLink={data} imageName={fullName} />)
  // }

  async function downloadImage () {
    const canvas = document.querySelector('canvas')
    const data = canvas.toDataURL('image/png')
    const image = await fetch(data)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = fullName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      {userId ? (
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
            {/* <button onClick={share}>🔗</button> */}
          </div>
          <div className="m-flexCenter">
            <button
              className="m-button m-margin-bottom"
              onClick={downloadImage}
            >
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
  edit: PropTypes.bool,
  userId: PropTypes.string,
  fullName: PropTypes.string,
  userSubtitle: PropTypes.string,
  userLevel: PropTypes.string,
  userType: PropTypes.string
}
