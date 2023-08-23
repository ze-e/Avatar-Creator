import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'

import { DataContext } from 'contexts/DataContext'
import { ModalContext } from 'contexts/ModalContext'
import { UserContext } from 'contexts/UserContext'
import { UserApi } from 'api'

import DataReducer, { initialState } from 'reducers/DataReducer'

function DataLayer ({ children }) {
  const [state, dispatch] = useReducer(DataReducer, initialState)
  const [user, setUser] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(<></>)
  const [modalStyle, setModalStyle] = useState('normal')

  async function reloadUser () {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      const savedUser = await UserApi.loadUser(token)
      if (savedUser.data) {
        setUser(savedUser)
      }
    }
  }

  return (
    <DataContext.Provider value={{ state, dispatch }}>
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
