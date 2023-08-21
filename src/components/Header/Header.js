import React, { useContext, useEffect } from 'react'
import { UserContext } from 'contexts/UserContext'
import { ModalContext } from 'contexts/ModalContext'
import { useNavigate } from 'react-router-dom'
import { UserApi } from 'api'

import MainNav from 'components/MainNav/MainNav'
import Banner from 'components/Banner/Banner'

export default function Header () {
  const { setModalOpen } = useContext(ModalContext)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  async function loginSavedUser (token) {
    const savedUser = await UserApi.loadUser(token)
    if (savedUser?.data) {
      setUser(savedUser)
      setModalOpen(false)
      navigate('/profile')
    }
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!user.data && token) {
      loginSavedUser(token)
    }
  }, [])

  return (
    <div className="header">
      <Banner />
      <MainNav />
    </div>
  )
}
