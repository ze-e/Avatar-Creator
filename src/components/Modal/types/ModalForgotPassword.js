import React, { useState, useContext } from 'react'
import { ModalContext } from 'contexts/ModalContext'
import { UserApi } from 'api'
import showToast from 'utils/toast'

export default function ForgotPassword () {
  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const { setModalOpen } = useContext(ModalContext)

  async function forgotPassword (e) {
    setLoading(true)
    if (e.target.checkValidity() === true) {
      const emailInput = e.target[0]
      const email = emailInput.value
      try {
        await UserApi.forgotPassword(email)
        showToast({
          text: 'Check your email for a password reset link',
          style: { background: 'green' }
        })
        setModalOpen(false)
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
        forgotPassword(e)
      }}
      onChange={(e) => {
        setIsValid(e.target.checkValidity())
      }}
    >
      <div className="m-flexColumnCenter">
        <h2 className="m-title-stroke-black modal__header">Forgot Password?</h2>
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          required
          minLength={3}
          maxLength={100}
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
