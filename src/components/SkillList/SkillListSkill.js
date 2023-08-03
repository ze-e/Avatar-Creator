import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { DataContext } from 'contexts/DataContext'

export default function SkillListSkill ({ quest, skill, index, teacherView }) {
  const { dispatch, ACTIONS } = useContext(DataContext)

  const [edit, setEdit] = useState(false)
  const [inputName, setInputName] = useState(skill)

  return (
    <div key={skill} className="skillListSkill__skill">
      {!edit ? (
        <div className="skillListSkill__text m-flex">
          <span className="skillListSkill__name m-title-stroke-black">{`Skill ${
            index + 1
          } - ${skill}`}</span>
          <span className="skillListSkill__skillXP m-title-stroke-black">
            +10 XP/Gold
          </span>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            dispatch({
              type: ACTIONS.RENAME_SKILL,
              payload: { quest, skill, name: inputName }
            })
            setEdit(false)
          }}
        >
          <input
            onChange={(e) => {
              setInputName(e.target.value)
            }}
            value={inputName}
            placeholder="Enter name..."
            minLength={3}
            maxLength={15}
          />
          <button type="submit">Change Name</button>
        </form>
      )}
      <div className="m-flex">
        {!edit && teacherView && (
          <button
            className="m-skillListButton button"
            type="button"
            onClick={() => {
              setEdit(true)
            }}
          >
            Rename
          </button>
        )}
        {!edit && teacherView && (
          <button
            className="m-skillListButton button"
            type="button"
            disabled={quest.skills.length === 1}
            onClick={() => {
              dispatch({
                type: ACTIONS.DELETE_SKILL,
                payload: { quest, skill }
              })
            }}
          >
            Delete Skill
          </button>
        )}
      </div>
    </div>
  )
}

SkillListSkill.propTypes = {
  index: PropTypes.number,
  skill: PropTypes.string,
  quest: PropTypes.object,
  teacherView: PropTypes.bool
}
