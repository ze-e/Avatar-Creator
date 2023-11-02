import React, { useState, useContext } from 'react'
import { ModalContext } from 'contexts/ModalContext'
import { UserApi } from 'api'
import showToast from 'utils/toast'
import { ModalLogin } from 'components/Modal/ModalTypes'

export default function ModalPWReset () {
  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const { setModalContent } = useContext(ModalContext)

  async function resetPassword (e) {
    setLoading(true)
    if (e.target.checkValidity() === true) {
      const passwordInput = e.target[0]
      const password2Input = e.target[1]
      const password = passwordInput.value
      const password2 = password2Input.value
      try {
        if (password !== password2) throw new Error('Passwords do not match')
        await UserApi.resetPassword(password)
        showToast({
          text: 'Reset password successfully!',
          style: { background: 'green' }
        })
        setModalContent(<ModalLogin />)
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
        resetPassword(e)
      }}
      onChange={(e) => {
        setIsValid(e.target.checkValidity())
      }}
    >
      <div className="m-flexColumnCenter">
        <h2 className="m-title-stroke-black modal__header">Reset Password</h2>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          required
          minLength={3}
          maxLength={15}
        />
        <input
          name="password2"
          type="password2"
          placeholder="Re-Enter password"
          required
          minLength={3}
          maxLength={15}
        />
      </div>
      <button
        className="m-modalButton"
        type="submit"
        disabled={!isValid || loading}
      >
        {!loading ? 'Submit' : 'Loading...'}
      </button>
    </form>
  )
}
