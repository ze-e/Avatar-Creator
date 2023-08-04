import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import InputField from 'components/InputField/InputField'
import { UserContext } from 'contexts/UserContext'
import { DataContext } from 'contexts/DataContext'

export default function ProfileInfo ({ data }) {
  const { dispatch, ACTIONS } = useContext(DataContext)
  const { user } = useContext(UserContext)

  function profiledata () {
    const exclude = ['img', 'type', 'level', 'xp', 'gold']
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

  function changeValue (field, newVal) {
    dispatch({
      type: ACTIONS.EDIT_DATA,
      payload: { userName: user.admin.userName, field, newVal }
    })
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
      <div className="profileInfo__data m-flex">
        <ul className="profileInfo__list">{profiledata()}</ul>
      </div>
    </div>
  )
}

ProfileInfo.propTypes = {
  data: PropTypes.object
}
