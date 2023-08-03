// import { debug } from './debug'

export function getItemData (itemData, id) {
  return itemData.find((i) => i.id === id)
}

export function canBuyItem (item, gold) {
  return gold - item.cost >= 0
}

export function count (inventory, itemId) {
  let count = 0
  inventory.forEach((i) => {
    if (i === itemId) count++
  })
  return count
}
