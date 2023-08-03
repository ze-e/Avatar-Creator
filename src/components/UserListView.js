import React, { useContext } from 'react'
import { DataContext } from 'contexts/DataContext'
import { formattedDate } from 'utils/date'
import { getQuestById } from 'utils/quest'

export default function UserListView () {
  const { state, dispatch, ACTIONS } = useContext(DataContext)

  return (
    <ul className="userListView">
      <ul className="userListView__labelList">
        {state?.userData.length > 0 &&
          Object.keys(state.userData[0].data).map(
            (label) =>
              label !== 'img' && (
                <li className="userListView__label" key={label}>
                  <em>{label}</em>
                </li>
              )
          )}
        {
          <li className="userListView__label">
            <em>Current quest:</em>
          </li>
        }
      </ul>
      {state?.userData.length > 0 &&
        state.userData.map((user) => {
          return (
            <ul key={user.data.userName} className="userListView__valueList">
              {Object.entries(user.data)
                .map(
                  (keyVal) =>
                    keyVal[0] !== 'img' &&
                    (keyVal[0] === 'birthday'
                      ? formattedDate(keyVal[1])
                      : keyVal[1])
                )
                .map((field) => {
                  return (
                    <li className="userListView__value" key={field}>
                      {field}
                    </li>
                  )
                })}
              {
                <li className="userListView__value">
                  {' '}
                  {user.admin.submittedQuest && (
                    <>
                      <p>
                        {
                          getQuestById(
                            state.data.levels,
                            user.admin.submittedQuest
                          )?.name
                        }
                      </p>{' '}
                      <button
                        className="userListView__submitButton"
                        type="button"
                        onClick={() =>
                          dispatch({
                            type: ACTIONS.APPROVE_QUEST,
                            payload: {
                              userName: user.admin.userName,
                              questId: user.admin.currentQuest
                            }
                          })
                        }
                      >
                        Approve Assignment
                      </button>
                    </>
                  )}
                </li>
              }
            </ul>
          )
        })}
    </ul>
  )
}
