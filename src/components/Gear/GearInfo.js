import React, { useContext } from 'react'
import { UserContext } from 'contexts/UserContext'
import { DataContext } from 'contexts/DataContext'
import { getGearData } from 'utils/avatar'
import { UserApi } from 'api'
import AvatarChange from 'components/Avatar/AvatarChange'

export default function GearInfo () {
  const { user, reloadUser } = useContext(UserContext)
  const { state } = useContext(DataContext)

  async function unequipItem (item) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      await UserApi.unequipItem(token, user._id, { item })
      reloadUser()
    }
  }

  function equippedData () {
    return Object.entries(user?.data?.gear)
      .map((i) => {
        return { key: i[0], value: i[1] }
      })
      .map((j) => (
        <li className="profileInfo__listItem" key={j.key}>
          <em>{j.key[0].toUpperCase() + j.key.substring(1)}</em> :{' '}
          {getGearData(state.itemData, j.value)?.name}
          {j.value !== '' && (
            <>
              <br />{' '}
              <button
                type="button"
                onClick={ () => unequipItem(getGearData(state.itemData, j.value))
                }
              >
                Remove
              </button>
            </>
          )}
        </li>
      ))
  }

  return (
    <div className="profileInfo">
      <div className="m-flex profileInfo__intro">
        <div>
          <h2 className="profileInfo__title">Equipped</h2>
        </div>
      </div>
      <AvatarChange />
      <div className="profileInfo__data m-flex">
        <ul className="profileInfo__list">{equippedData()}</ul>
      </div>
    </div>
  )
}
