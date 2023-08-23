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
        <ModalLogin />
      )
    }
  }, [user])

  return !user?.data ? <div className="loginView">
      <p style={{ color: 'white', padding: '8px' }}>{'Please log in...'}</p>
</div> : <Navigate to="/profile" />
}
