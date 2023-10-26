import React, { useContext } from 'react'
import { UserContext } from 'contexts/UserContext'
import { DataContext } from 'contexts/DataContext'
import { canBuyItem, count } from 'utils/item'
import { UserApi } from 'api'

export default function GearStore () {
  const { user, reloadUser } = useContext(UserContext)
  const { state } = useContext(DataContext)

  async function buy (item) {
    if (canBuyItem(item, user.data.gold)) {
      const token = JSON.parse(localStorage.getItem('token'))
      if (token) {
        await UserApi.addToInventory(token, user._id, { item })
        reloadUser()
      }
    } else alert('Not enough gold to buy!')
  }
  return (
    <>
      <h3>Gold: ${user.data.gold}</h3>
      <ul className="m-flex-wrap">
        {state.itemData.map((item) => (
          <li className="gear-item" key={item.id}>
            <em>${item.cost}</em> {item.name}{' '}
            {user.data.inventory.includes(item.id) && (
              <em> -- owned x{count(user.data.inventory, item.id)}</em>
            )}{' '}
            <button type="button" onClick={() => buy(item)}>
              Buy
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
