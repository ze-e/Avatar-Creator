import React from 'react'
import PropTypes from 'prop-types'

import { formattedDate } from 'utils/date'

export default function DisplayField ({ itemData }) {
  return (
    <li className='m-flex' style={{ marginBottom: '12px' }}>
      <em>{itemData.key[0].toUpperCase() + itemData.key.substring(1)}: </em>
          <div className='m-flex'>
            <span style={{ marginRight: '12px', marginLeft: '12px' }}>
              {itemData.key === 'birthday' ? formattedDate(itemData.value) : itemData.value}
            </span>
          </div>
    </li>
  )
}
DisplayField.propTypes = {
  itemData: PropTypes.object
}
