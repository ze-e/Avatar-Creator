import React from 'react'
import PropTypes from 'prop-types'

export default function Badge ({ badge, selected = false, ...props }) {
  return (
    <div className={`badge ${Boolean(selected) && 'selected'}`} {...props}>
      <div className="badge-item badge-text">
        <h3 className="badge-item badge-title">{badge.name}</h3>
        <h4 className="badge-item badge-description">{badge.description}</h4>
      </div>
      <img className="badge-item badge-img" src={badge.src} alt={badge.name} />
    </div>
  )
}

Badge.propTypes = {
  badge: PropTypes.object.isRequired,
  selected: PropTypes.bool
}
