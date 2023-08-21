import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { ModalContext } from 'contexts/ModalContext'
import { ModalRegister } from 'components/Modal/ModalTypes'
import { UserApi } from 'api'
export default function ModalLogin ({ handleSubmit }) {
  const [isValid, setIsValid] = useState(false)
  const [error, setError] = useState('')
  const { setModalOpen, setModalContent } = useContext(ModalContext)
  const navigate = useNavigate()

  function openRegister () {
    setModalOpen(true)
    setModalContent(
      <ModalRegister/>
    )
  }

  async function login (e) {
    const userInput = e.target[0]
    const passwordInput = e.target[1]
    const userName = userInput.value
    const password = passwordInput.value
    try {
      const res = await UserApi.loginUser({ userName, password })
      if (res.token) {
        localStorage.setItem('token', JSON.stringify(res.token))
        navigate('/profile')
      }
      return null
    } catch (e) {
      return 'Error connecting to server'
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (e.target.checkValidity() === true) {
          const error = login(e)
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
          placeholder="Enter username or email"
          required
          minLength={3}
          maxLength={100}
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
      <p className="m-error">{typeof error === 'string' && error}</p>
      <button className="m-modalButton" type="submit" disabled={!isValid}>
        Submit
      </button>
      <span className="modal__link_container">
        <a className="modal__link" onClick={() => openRegister()}>
          Or Create a New User
        </a>
      </span>
    </form>
  )
}

ModalLogin.propTypes = {
  handleSubmit: PropTypes.func
}
