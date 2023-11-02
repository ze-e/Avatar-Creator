import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalContext } from 'contexts/ModalContext'
import { ModalRegister, ModalForgotPassword } from 'components/Modal/ModalTypes'
import { UserApi } from 'api'
import { UserContext } from 'contexts/UserContext'
import showToast from 'utils/toast'

export default function ModalLogin () {
  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const { setUser } = useContext(UserContext)
  const { setModalOpen, setModalContent } = useContext(ModalContext)
  const navigate = useNavigate()

  function openRegister () {
    setModalOpen(true)
    setModalContent(<ModalRegister />)
  }

  function openForgotPassword () {
    setModalOpen(true)
    setModalContent(<ModalForgotPassword />)
  }

  async function login (e) {
    setLoading(true)
    if (e.target.checkValidity() === true) {
      const userInput = e.target[0]
      const passwordInput = e.target[1]
      const userName = userInput.value
      const password = passwordInput.value
      try {
        const res = await UserApi.loginUser({ userName, password })
        if (res.token) {
          const token = res.token
          localStorage.setItem('token', JSON.stringify(res.token))
          const savedUser = await UserApi.loadUser(token)
          if (savedUser?.data) {
            setUser(savedUser)
            setModalOpen(false)
            navigate('/profile')
          }
        } else if (res.status !== 200 && res.data.error) {
          showToast({ text: res.data.error })
        }
      } catch (e) {
        if (e) showToast({ text: e })
      }
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        login(e)
      }}
      onChange={(e) => {
        setIsValid(e.target.checkValidity())
      }}
    >
      <div className='m-flexColumnCenter'>
        <h2 className='m-title-stroke-black modal__header'>Log In</h2>
        <input
          name='name'
          placeholder='Enter username or email'
          required
          minLength={3}
          maxLength={100}
        />
        <input
          name='password'
          type='password'
          placeholder='Enter password'
          required
          minLength={3}
          maxLength={15}
        />
      </div>
      <button
        className='m-modalButton'
        type='submit'
        disabled={!isValid || loading}
      >
        {!loading ? 'Submit' : 'Loading...'}
      </button>
      <span className='modal__link_container'>
        <a className='modal__link' onClick={() => openRegister()}>
          Create New User
        </a>
      </span>
      <span className='modal__link_container'>
        <a className='modal__link' onClick={() => openForgotPassword()}>
          Forgot Password?
        </a>
      </span>
    </form>
  )
}
