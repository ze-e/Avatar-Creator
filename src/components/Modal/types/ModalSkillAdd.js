import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function ModalSkillAdd ({ handleSubmit, skillList }) {
  const [isValid, setIsValid] = useState(false)

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Add new skill..."
        defaultValue="New Skill"
        minLength={3}
        maxLength={15}
        required
        onChange={(e) => {
          setIsValid(
            e.target.checkValidity() && !skillList.includes(e.target.value)
          )
        }}
      />
      <button
        className="m-skillListButton button"
        type="submit"
        disabled={!isValid}
      >
        Add Skill
      </button>
    </form>
  )
}

ModalSkillAdd.propTypes = {
  handleSubmit: PropTypes.func,
  skillList: PropTypes.arrayOf(PropTypes.string)
}
