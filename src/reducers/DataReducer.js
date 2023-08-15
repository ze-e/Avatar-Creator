import {
  userData,
  itemData,
  avatarData,
  gameData
} from '../data/sampleData'

// actions
import USERACTIONS from './userData/actions/actions'
import ITEMACTIONS from './itemData/actions/actions'

// functions
import userFunctions from './userData/functions/functions'
import itemFunctions from './itemData/functions/functions'

export const initialState = {
  userData,
  avatarData,
  itemData,
  gameData
}

export const ACTIONS = {
  ...USERACTIONS,
  ...ITEMACTIONS
}

function DataReducer (state, action) {
  switch (action.type) {
    // user
    case ACTIONS.EDIT_DATA:
      return userFunctions.editData(state, action.payload)
    case ACTIONS.EDIT_ADMIN:
      return userFunctions.editAdmin(state, action.payload)
    case ACTIONS.CHANGE_AVATAR:
      return userFunctions.changeAvatar(state, action.payload)
    case ACTIONS.GAIN_XP:
      return userFunctions.gainXP(state, action.payload)
    case ACTIONS.SAVE_LAST_STATE:
      return userFunctions.saveLastState(state, action.payload)
    case ACTIONS.UNDO:
      return userFunctions.undo(state, action.payload)
    // item
    case ACTIONS.BUY_ITEM:
      return itemFunctions.buyItem(state, action.payload)
    case ACTIONS.EQUIP_ITEM:
      return itemFunctions.equipItem(state, action.payload)
    case ACTIONS.UNEQUIP_ITEM:
      return itemFunctions.unequipItem(state, action.payload)

    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export default DataReducer
