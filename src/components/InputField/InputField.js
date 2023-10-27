import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { formattedDate } from 'utils/date'

export default function InputField ({ itemData, onSubmit }) {
  const [state, setState] = useState(itemData.value)
  const [edit, setEdit] = useState(false)

  function handleSubmit (e) {
    e.preventDefault()
    onSubmit(itemData.key, state)
    setEdit(false)
  }
  return (
    <li className="m-flex" style={{ marginBottom: '12px' }}>
      <em>{itemData.key[0].toUpperCase() + itemData.key.substring(1)}: </em>
      {edit ? (
        <form
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
          {itemData.key === 'description' ? (
            <textarea
              name={itemData.key}
              value={state}
              onChange={(e) => {
                setState(e.target.value)
              }}
            />
          ) : (
            <input
              name={itemData.key}
              type={itemData.key === 'birthday' ? 'date' : 'text'}
              value={state}
              onChange={(e) => {
                setState(e.target.value)
              }}
            />
          )}
          <button type="submit" className="m-input-button">
            Submit
          </button>
        </form>
      ) : (
        <div className="m-flex">
          <span>
            {itemData.key === 'birthday' ? formattedDate(state) : state}
          </span>
          <button
            type="button"
            className="m-input-button"
            onClick={(e) => {
              setEdit(true)
            }}
          >
            edit
          </button>
        </div>
      )}
    </li>
  )
}
InputField.propTypes = {
  itemData: PropTypes.object,
  onSubmit: PropTypes.func,
  remount: PropTypes.string
}
