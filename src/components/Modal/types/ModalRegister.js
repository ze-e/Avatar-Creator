import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { ModalContext } from 'contexts/ModalContext'
import { ModalLogin } from 'components/Modal/ModalTypes'

import { UserApi } from 'api'
export default function ModalRegister ({ handleSubmit }) {
  const [isValid, setIsValid] = useState(false)
  const [error, setError] = useState('')
  const { setModalOpen, setModalContent } = useContext(ModalContext)

  function openLogin () {
    setModalOpen(true)
    setModalContent(
      <ModalLogin
        handleSubmit={() => {
          setModalOpen(false)
        }}
      />
    )
  }

  async function register (e) {
    const userInput = e.target[0]
    const emailInput = e.target[1]
    const passwordInput = e.target[2]
    const userName = userInput.value
    const email = emailInput.value
    const password = passwordInput.value
    try {
      const res = await UserApi.registerUser({
        userName,
        email,
        password
      })
      if (!res) return 'Could not register new user'
      else return openLogin()
    } catch (e) {
      return 'Error connecting to server'
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (e.target.checkValidity() === true) {
          const error = register(e)
          if (!error) {
            handleSubmit()
          } else setError(error)
        }
      }}
      onChange={(e) => {
        setIsValid(e.target.checkValidity())
      }}
    >
      <div className="m-flexColumnCenter">
        <h2 className="m-title-stroke-black modal__header">Log In</h2>
        <input
          name="name"
          placeholder="Enter username"
          required
          minLength={3}
          maxLength={15}
        />
        <input
          name="email"
          placeholder="Enter email"
          required
          minLength={3}
          maxLength={15}
          pattern={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/}
        />
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          required
          minLength={3}
          maxLength={15}
        />
      </div>
      <p className="m-error">{error}</p>
      <button className="m-modalButton" type="submit" disabled={!isValid}>
        Submit
      </button>
      <span>Or <a onClick={() => openLogin() }>Login</a></span>
    </form>
  )
}

ModalRegister.propTypes = {
  handleSubmit: PropTypes.func
}
