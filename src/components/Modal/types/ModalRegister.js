import React, { useState, useContext } from 'react'
import showToast from 'utils/toast'
import PropTypes from 'prop-types'
import { ModalContext } from 'contexts/ModalContext'
import { ModalLogin } from 'components/Modal/ModalTypes'

import { UserApi } from 'api'
export default function ModalRegister () {
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setModalOpen, setModalContent } = useContext(ModalContext)

  function openLogin () {
    setModalOpen(true)
    setModalContent(
      <ModalLogin />
    )
  }

  async function register (e) {
    const userInput = e.target[0]
    const emailInput = e.target[1]
    const passwordInput = e.target[2]
    const password2Input = e.target[3]
    const userName = userInput.value
    const email = emailInput.value
    const password = passwordInput.value
    const password2 = password2Input.value

    try {
      if (password !== password2) throw new Error('Passwords do not match')
      const res = await UserApi.registerUser({
        userName,
        email,
        password
      })
      if (res.status !== 200 && res.data.error) {
        showToast({ text: res.data.error })
      } else return null
    } catch (e) {
      return showToast({ text: 'Error connecting to server' })
    }
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        if (e.target.checkValidity() === true) {
          const error = await register(e)
          if (!error) {
            openLogin()
          } else {
            showToast({ text: error })
          }
        }
        setLoading(false)
      }}
      onChange={(e) => {
        setIsValid(e.target.checkValidity())
      }}
    >
      <div className='m-flexColumnCenter'>
        <h2 className='m-title-stroke-black modal__header'>Create New User</h2>
        <input
          name='name'
          placeholder='Enter username'
          required
          minLength={3}
          maxLength={15}
        />
        <input
          name='email'
          type='email'
          placeholder='Enter email'
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
        <input
          name='password2'
          type='password'
          placeholder='Re-Enter password'
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
        {!loading ? 'Register' : 'Loading...'}
      </button>
      <span className='modal__link_container'>
        <a className='modal__link' onClick={() => openLogin()}>
          Or Login An Existing User
        </a>
      </span>
    </form>
  )
}

ModalRegister.propTypes = {
  handleSubmit: PropTypes.func
}
