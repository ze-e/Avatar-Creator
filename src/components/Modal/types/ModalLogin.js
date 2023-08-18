import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { DataContext } from 'contexts/DataContext'
import { UserContext } from 'contexts/UserContext'
import { useNavigate } from 'react-router-dom'
export default function ModalLogin ({ handleSubmit }) {
  const [isValid, setIsValid] = useState(false)
  const [error, setError] = useState('')
  const { state } = useContext(DataContext)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  function login (e) {
    const userInput = e.target[0]
    const passwordInput = e.target[1]
    const userVal = userInput.value
    const passwordVal = passwordInput.value
    const userData = state.userData.find(
      (i) => i.admin.userName.toLowerCase() === userVal.toLowerCase()
    )
    if (userData && userData.admin.password === passwordVal) {
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      navigate('/profile')
    } else return 'Incorrect username or password'
    return null
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
        <h2 className="m-title-stroke-black modal__header">
          Log In
        </h2>
        <input
          name="name"
          placeholder="Enter username"
          required
          minLength={3}
          maxLength={15}
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
    </form>
  )
}

ModalLogin.propTypes = {
  handleSubmit: PropTypes.func
}
