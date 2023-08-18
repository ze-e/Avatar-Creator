import React, { useContext, useEffect } from 'react'
import { UserContext } from 'contexts/UserContext'
import { Navigate } from 'react-router-dom'
import { ModalLogin } from 'components/Modal/ModalTypes'
import { ModalContext } from 'contexts/ModalContext'

export default function LoginView () {
  const { user } = useContext(UserContext)
  const { setModalOpen, setModalContent } = useContext(ModalContext)
  useEffect(() => {
    if (!user?.data) {
      setModalOpen(true)
      setModalContent(
        <ModalLogin
          handleSubmit={() => {
            setModalOpen(false)
          }}
        />
      )
    }
  }, [user])

  return !user?.data ? <div className="loginView">
      <p style={{ color: 'white', padding: '8px' }}>{'This app is still being created and is in demo mode only. Data will not save! Try it with test user "user" and password "password123"'}</p>
</div> : <Navigate to="/profile" />
}
