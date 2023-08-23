import {
  itemData,
  avatarData,
  gameData
} from '../data/sampleData'

export const initialState = {
  avatarData,
  itemData,
  gameData
}

function DataReducer (state, action) {
  switch (action.type) {
    // no more actions
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export default DataReducer
