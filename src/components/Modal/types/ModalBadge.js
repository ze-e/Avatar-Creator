import React, { useState, useContext } from 'react'
import { TeacherApi } from 'api'
import PropTypes from 'prop-types'
import { DataContext } from 'contexts/DataContext'
import Badge from 'components/Badge/Badge'

export default function ModalBadge ({ userId, userBadges, modalFunction = 'add', close }) {
  const [loading, setLoading] = useState(false)
  const [badge, setBadge] = useState(null)
  const { state } = useContext(DataContext)
  const badges = modalFunction === 'add' ? state.badgeData.filter(b => !userBadges.includes(b.id)) : state.badgeData.filter(b => userBadges.includes(b.id))

  async function addBadge () {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      setLoading(true)
      try {
        await TeacherApi.addBadge(token, userId, { badgeId: badge })
        setLoading(false)
        close()
      } catch (e) {
        console.log(`error during add badge ${e}`)
      }
    }
  }

  async function removeBadge () {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      setLoading(true)
      try {
        await TeacherApi.removeBadge(token, userId, { badgeId: badge })
        setLoading(false)
        close()
      } catch (e) {
        console.log(`error during remove badge ${e}`)
      }
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        modalFunction === 'add' ? addBadge() : removeBadge()
      }}
    >
      <div
        className="m-flexColumnCenter"
        onClick={(e) => {
          if (!e.target.classList.contains('badge-item')) {
            setBadge(null)
          }
        }}
      >
        <h2 className="m-title-stroke-black modal__header">
          {modalFunction === 'add' ? 'Add' : 'Remove'} Badge:
        </h2>
        <div className="badges">
          {badges?.length > 0 &&
            badges.map((b) => (
              <div key={b.id}>
                <Badge
                  badge={b}
                  selected={Boolean(badge === b.id)}
                  onClick={() => setBadge(b.id)}
                />
              </div>
            ))}
        </div>
      </div>
      <p className="m-error">{typeof error === 'string'}</p>
      <button className="m-modalButton" type="submit" disabled={!badge}>
        {!loading || badge !== null ? 'Submit' : 'Loading...'}
      </button>
    </form>
  )
}

ModalBadge.propTypes = {
  userId: PropTypes.string.isRequired,
  userBadges: PropTypes.array.isRequired,
  close: PropTypes.func.isRequired,
  modalFunction: PropTypes.string
}
