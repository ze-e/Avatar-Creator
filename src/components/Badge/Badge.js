import React from 'react'
import PropTypes from 'prop-types'

export default function Badge ({ children }) {
  return (
    <div className='badge'>{children}</div>
  )
}

Badge.propTypes = {
  children: PropTypes.any.isRequired
}
