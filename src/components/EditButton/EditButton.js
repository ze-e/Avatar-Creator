import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function EditButton ({ beforeEdit, afterEdit, handleSubmit }) {
  const [edit, setEdit] = useState(false)

  function submit (e) {
    e.preventDefault()
    if (handleSubmit) handleSubmit()
    setEdit(false)
  }

  return (
    <>
      {!edit
        ? <>
          {beforeEdit}
          <button type='button' className='m-input-button' onClick={(e) => {
            setEdit(true)
          }}>edit</button>
        </>
        : <>
          <form onSubmit={submit}>
            {afterEdit}
            <button type='submit' className='m-input-button'>submit</button>
          </form>
        </>
      }
    </>
  )
}

EditButton.propTypes = {
  beforeEdit: PropTypes.object,
  afterEdit: PropTypes.object,
  handleSubmit: PropTypes.func
}
