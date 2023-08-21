import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import InputField from 'components/InputField/InputField'
import { UserContext } from 'contexts/UserContext'
import AvatarChange from 'components/Avatar/AvatarChange'
import { UserApi } from 'api'
export default function ProfileInfo ({ data }) {
  const { user, reloadUser } = useContext(UserContext)

  function profiledata () {
    const exclude = ['img', 'type', 'level', 'xp', 'gold', 'gear', 'inventory', 'avatar']
    return Object.entries(data)
      .map((i) => {
        return { key: i[0], value: i[1] }
      })
      .filter((i) => !exclude.includes(i.key))
      .map((itemData) => (
        <InputField
          key={itemData.key}
          itemData={itemData}
          onSubmit={changeValue}
        />
      ))
  }

  async function changeValue (key, value) {
    await UserApi.editUser(user._id, { newVals: { key, value } })
    reloadUser()
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
      <AvatarChange />
      <div className="profileInfo__data m-flex">
        <ul className="profileInfo__list">{profiledata()}</ul>
      </div>
    </div>
  )
}

ProfileInfo.propTypes = {
  data: PropTypes.object
}
