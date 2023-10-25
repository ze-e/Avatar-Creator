import React from 'react'
import PropTypes from 'prop-types'

export default function Bubble ({ children }) {
  return (
    <div className='bubble'>{children}</div>
  )
}

Bubble.propTypes = {
  children: PropTypes.any.isRequired
}
