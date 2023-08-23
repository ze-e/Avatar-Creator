import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { Navigate } from 'react-router-dom'
import { UserContext } from 'contexts/UserContext'

const ProtectedRoute = ({ Component }) => {
  const { user } = useContext(UserContext)

  return user?.admin?.userType === 'admin' ? (
    Component
  ) : (
    <Navigate to="/login" />
  )
}

export default ProtectedRoute

ProtectedRoute.propTypes = {
  Component: PropTypes.node
}
