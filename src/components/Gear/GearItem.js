import React from 'react'
import PropTypes from 'prop-types'

export default function GearItem ({ data, handleClick, highlight }) {
  return (
    <div
      className={`gearItem ${highlight && 'highlight'}`}
      onClick={handleClick}
    >
      <img className="gearItem__img" src={data.src} alt={data.name} />
      <div className="gearItem__text">
        <h3 className="gearItem__name">{data.name}</h3>
        <p className="gearItem__location">{data.location}</p>
      </div>
    </div>
  )
}

GearItem.propTypes = {
  data: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  highlight: PropTypes.bool
}
