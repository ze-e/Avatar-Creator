import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'

import { DataContext } from 'contexts/DataContext'
import { ModalContext } from 'contexts/ModalContext'
import { UserContext } from 'contexts/UserContext'

import DataReducer, { initialState, ACTIONS } from 'reducers/DataReducer'

function DataLayer ({ children }) {
  const [state, dispatch] = useReducer(DataReducer, initialState)
  const [user, setUser] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(<></>)
  const [modalStyle, setModalStyle] = useState('normal')

  function reloadUser () {
    const userData = state.userData.find(
      (i) => i.admin.userName.toLowerCase() === user.admin.userName.toLowerCase()
    )
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  return (
    <DataContext.Provider value={{ state, dispatch, ACTIONS }}>
      <UserContext.Provider value={{ user, setUser, reloadUser }}>
        <ModalContext.Provider
          value={{ modalOpen, setModalOpen, modalContent, setModalContent, modalStyle, setModalStyle }}
        >
          {children}
        </ModalContext.Provider>
      </UserContext.Provider>
    </DataContext.Provider>
  )
}

DataLayer.propTypes = {
  children: PropTypes.node
}

export default DataLayer
