import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import InputField from 'components/InputField/InputField'
import DisplayField from 'components/DisplayField/DisplayField'
import { UserContext } from 'contexts/UserContext'
import AvatarChange from 'components/Avatar/AvatarChange'
import Badge from 'components/Badge/Badge'
import { UserApi } from 'api'
import { Link } from 'react-router-dom'
import { DataContext } from 'contexts/DataContext'
import { getBadgeData } from 'utils/badge'
export default function ProfileInfo ({ data, publicView = false }) {
  const { user, reloadUser } = useContext(UserContext)
  const { state } = useContext(DataContext)

  function profiledata () {
    const exclude = ['img', 'type', 'level', 'xp', 'gold', 'gear', 'inventory', 'avatar', 'badges']
    return Object.entries(data)
      .map((i) => {
        return { key: i[0], value: i[1] }
      })
      .filter((i) => !exclude.includes(i.key))
      .map((itemData) => (publicView ? <DisplayField key={itemData.key} itemData={itemData} /> : <InputField key={itemData.key} itemData={itemData} onSubmit={changeValue} />))
  }

  async function changeValue (key, value) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      await UserApi.editUser(token, user._id, { newVals: { key, value } })
      reloadUser()
    }
  }

  return (
    <div className="profileInfo">
      <div className="m-flex profileInfo__intro">
        <div>
          <h2 className="profileInfo__title">{`${data.name}${
            data.epiphet && ' the '
          }${data.epiphet}`}</h2>
          <h3 className="profileInfo__subtitle">{`(Lv. ${data.level} ${data.type} ${data.job})`}</h3>
        </div>
      </div>
      {publicView ? (
        <>
          <Link to="/profile">
            <button>Edit Profile</button>
          </Link>
          <br />
        </>
      ) : (
        <AvatarChange />
      )}
      <div className="profileInfo__data m-flex">
        <ul className="profileInfo__list">{profiledata()}</ul>
      </div>
      <h2>Badges:</h2>
      <ul className="profileInfo__badges m-flex">
        {data.badges.map((b) => (
          <div key={b}>
            <Badge badge={getBadgeData(state.badgeData, b)} key={b} />
          </div>
        ))}
      </ul>
    </div>
  )
}

ProfileInfo.propTypes = {
  data: PropTypes.object,
  publicView: PropTypes.bool
}
