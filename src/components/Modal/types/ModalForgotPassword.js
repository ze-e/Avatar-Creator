import React, { useState, useContext } from 'react'
import { ModalContext } from 'contexts/ModalContext'
import { UserApi } from 'api'
import showToast from 'utils/toast'
import ModalResetPassword from './ModalResetPassword'

export default function ForgotPassword () {
  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const { setModalContent } = useContext(ModalContext)

  async function forgotPassword (e) {
    setLoading(true)
    if (e.target.checkValidity() === true) {
      const emailInput = e.target[0]
      const email = emailInput.value
      const res = await UserApi.forgotPassword({ email })
      if (res?.status === 200) {
        showToast({
          text: res.data.message,
          style: { background: 'green' }
        })
        setModalContent(<ModalResetPassword />)
      } else showToast({ text: res })
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
