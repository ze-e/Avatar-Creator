import React, { useContext } from 'react'
import { ModalLogin } from 'components/Modal/ModalTypes'
import { ModalContext } from 'contexts/ModalContext'
import { UserContext } from 'contexts/UserContext'
// import { DataContext } from 'contexts/DataContext'
// import { useNavigate } from 'react-router-dom'

export default function LoginButton () {
  const { setModalOpen, setModalContent } = useContext(ModalContext)
  const { user, setUser } = useContext(UserContext)
  // const { state } = useContext(DataContext)
  // const navigate = useNavigate()

  // function login (e) {
  //   const userInput = e.target[0]
  //   const passwordInput = e.target[1]
  //   const userVal = userInput.value
  //   const passwordVal = passwordInput.value
  //   const userData = state.userData.find(
  //     (i) => i.admin.userName.toLowerCase() === userVal.toLowerCase()
  //   )
  //   if (userData && userData.admin.password === passwordVal) {
  //     localStorage.setItem('user', JSON.stringify(userData))
  //     setUser(userData)
  //     navigate('/profile')
  //   }
  // }

  return !user.data ? (
    <button
      className="loginButton"
      onClick={() => {
        setModalOpen(true)
        setModalContent(
          <ModalLogin
            handleSubmit={() => {
              setModalOpen(false)
            }}
          />
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
        }}
      >
        Log Out
      </button>
    </>
  )
}
