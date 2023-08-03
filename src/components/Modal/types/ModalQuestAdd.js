import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function ModalQuestAdd ({ handleSubmit }) {
  const [isValid, setIsValid] = useState(false)

  return (
    <form
      onSubmit={handleSubmit}
      onChange={(e) => {
        setIsValid(e.target.checkValidity())
      }}
    >
      <input
        defaultValue="New Quest"
        placeholder="Enter quest name..."
        minLength={3}
        maxLength={15}
        required
      />
      <button
        className="m-skillListButton button"
        disabled={!isValid}
        type="submit"
      >
        {' '}
        Add New Quest
      </button>
    </form>
  )
}

ModalQuestAdd.propTypes = {
  handleSubmit: PropTypes.func
}
