import React, { useContext } from 'react'
import { ModalLogin } from 'components/Modal/ModalTypes'
import { ModalContext } from 'contexts/ModalContext'
import { UserContext } from 'contexts/UserContext'

export default function LoginButton () {
  const { setModalOpen, setModalContent } = useContext(ModalContext)
  const { user, setUser } = useContext(UserContext)

  return !user.data ? (
    <button
      className="loginButton"
      onClick={() => {
        setModalOpen(true)
        setModalContent(
          <ModalLogin />
        )
      }}
    >
      Log In
    </button>
  ) : (
    <>
      <button
        className="loginButton"
        onClick={() => {
          setUser({})
          localStorage.removeItem('token')
        }}
      >
        Log Out
      </button>
    </>
  )
}
