import React, { useContext } from 'react'
import { UserContext } from 'contexts/UserContext'
import { DataContext } from 'contexts/DataContext'
import { canBuyItem, count } from 'utils/item'

export default function GearStore () {
  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { user } = useContext(UserContext)

  async function buy (item) {
    if (canBuyItem(item, user.data.gold)) {
      await dispatch({
        type: ACTIONS.BUY_ITEM,
        payload: { userName: user.admin.userName, item }
      })
    } else alert('Not enough gold to buy!')
  }
  return (
    <>
      <h3>Gold: ${user.data.gold}</h3>
      <ul>
        {state.itemData.map((item) => (
          <li key={item.id}>
            <em>${item.cost}</em> {item.name}{' '}
            {user.inventory.includes(item.id) && (
              <em> -- owned x{count(user.inventory, item.id)}</em>
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
