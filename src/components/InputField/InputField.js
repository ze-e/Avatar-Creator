import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { formattedDate } from 'utils/date'

export default function InputField ({ itemData, onSubmit }) {
  const [state, setState] = useState(itemData.value)
  const [edit, setEditState] = useState(false)

  function handleSubmit (e) {
    e.preventDefault()
    if (edit && e.target.name !== itemData.key) {
      onSubmit(itemData.key, state)
      setEditState(false)
    }
  }
  return (
    <li className='m-flex' style={{ marginBottom: '12px' }}>
      <em>{itemData.key[0].toUpperCase() + itemData.key.substring(1)}: </em>
      {edit ? (
        <form
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
          <input
            name={itemData.key}
            type={itemData.key === 'birthday' ? 'date' : 'text'}
            value={state}
            onChange={(e) => {
              setState(e.target.value)
            }}
          />
          <button type='submit' className='m-input-button'>Submit</button>
        </form>
      ) : (
          <div className='m-flex'>
            <span style={{ marginRight: '12px', marginLeft: '12px' }}>
              {itemData.key === 'birthday' ? formattedDate(state) : state}
            </span>
            <button type='button' className='m-input-button' onClick={(e) => {
              setEditState(true)
            }}>edit</button>
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