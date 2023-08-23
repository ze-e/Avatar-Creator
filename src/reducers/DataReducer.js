import {
  itemData,
  avatarData,
  gameData
} from '../data/sampleData'

// actions
import USERACTIONS from './userData/actions/actions'

// functions
import userFunctions from './userData/functions/functions'

export const initialState = {
  avatarData,
  itemData,
  gameData
}

export const ACTIONS = {
  ...USERACTIONS
}

function DataReducer (state, action) {
  switch (action.type) {
    // user
    case ACTIONS.GAIN_XP:
      return userFunctions.gainXP(state, action.payload)
    case ACTIONS.SAVE_LAST_STATE:
      return userFunctions.saveLastState(state, action.payload)
    case ACTIONS.UNDO:
      return userFunctions.undo(state, action.payload)

    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export default DataReducer
