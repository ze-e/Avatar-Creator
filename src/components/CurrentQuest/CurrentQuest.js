import React, { useContext } from 'react'
import { UserContext } from 'contexts/UserContext'
import { DataContext } from 'contexts/DataContext'
import { getAllQuests } from 'utils/quest'

export default function CurrentQuest () {
  const { user } = useContext(UserContext)

  const { state, dispatch, ACTIONS } = useContext(DataContext)

  return !!user.admin.currentQuest && <div className="currentQuest">
          <div className="m-flex">
            <h2 className="currentQuest__title">
              Current Quest :
            </h2>

            <h3 className="currentQuest__name">
              {
                getAllQuests(state.data?.levels).find(
                  (q) => q.id === user.admin.currentQuest
                ).name
              }
            </h3>
          </div>

        {user.admin.submittedQuest ? (
        <h2 className="currentQuest__current">Submitted✔️</h2>
        ) : (
          !!user.admin.currentQuest && (
            <button
            className="currentQuest__submitButton m-button"
            type="button"
            onClick={() => {
              dispatch({
                type: ACTIONS.SUBMIT_QUEST,
                payload: {
                  userName: user.admin.userName,
                  questId: user.admin.currentQuest
                }
              })
            }}
              >
              {' '} Submit
          </button>
          ))}
      </div>
}
