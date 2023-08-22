import React, { useContext } from 'react'
import { UserContext } from 'contexts/UserContext'
import { DataContext } from 'contexts/DataContext'

import { getGearData } from 'utils/avatar'
import { UserApi } from 'api'

export default function GearInventory () {
  const { state } = useContext(DataContext)
  const { user, reloadUser } = useContext(UserContext)
  function inventoryData () {
    return user.data.inventory.map((item) => {
      return {
        data: getGearData(state.itemData, item),
        equipped: Object.values(user.data.gear).includes(item)
      }
    })
  }

  async function equipItem (item) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      await UserApi.equipItem(token, user._id, { item: item.data })
      reloadUser()
    }
  }

  return (
    <ul>
      {inventoryData().map((item) => (
        <li key={item.data.id}>
          {item.data.name}{' '}
          {item.equipped ? (
            <em> -- equipped</em>
          ) : (
            <button
              type="button"
              onClick={ () => equipItem(item) }
            >
              Equip
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
