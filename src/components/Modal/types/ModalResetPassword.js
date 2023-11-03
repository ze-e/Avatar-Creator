import React, { useState, useContext } from 'react'
import { ModalContext } from 'contexts/ModalContext'
import { UserApi } from 'api'
import showToast from 'utils/toast'
import { ModalLogin } from 'components/Modal/ModalTypes'

export default function ModalResetPassword () {
  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const { setModalContent } = useContext(ModalContext)

  async function resetPassword (e) {
    setLoading(true)
    if (e.target.checkValidity() === true) {
      const passwordInput = e.target[0]
      const password2Input = e.target[1]
      const tokenInput = e.target[2]
      const password = passwordInput.value
      const password2 = password2Input.value
      const token = tokenInput.value
      if (password !== password2) throw new Error('Passwords do not match')
      const res = await UserApi.resetPassword(password, token)
      if (res?.status === 200) {
        showToast({
          text: res.data.message,
          style: { background: 'green' }
        })
        setModalContent(<ModalLogin />)
      } else showToast({ text: res })
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
      <div className='m-flexColumnCenter'>
        <h2 className='m-title-stroke-black modal__header'>Reset Password</h2>
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
          type='password2'
          placeholder='Re-Enter password'
          required
          minLength={3}
          maxLength={15}
        />
        <input
          name='token'
          type='text'
          placeholder='Token'
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
    </form>
  )
}
