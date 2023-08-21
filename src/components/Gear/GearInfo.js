import React, { useContext } from 'react'
import { UserContext } from 'contexts/UserContext'
import { DataContext } from 'contexts/DataContext'
import { getGearData } from 'utils/avatar'
import AvatarChange from 'components/Avatar/AvatarChange'

export default function GearInfo () {
  const { user } = useContext(UserContext)
  const { state, dispatch, ACTIONS } = useContext(DataContext)

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
                onClick={async () =>
                  await dispatch({
                    type: ACTIONS.UNEQUIP_ITEM,
                    payload: {
                      userName: user.admin.userName,
                      item: getGearData(state.itemData, j.value)
                    }
                  })
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
