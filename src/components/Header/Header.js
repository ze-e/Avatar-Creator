/* eslint-disable */

import React, { useContext, useEffect } from 'react'
import { UserContext } from 'contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { UserApi } from 'api'

import MainNav from 'components/MainNav/MainNav'
import Banner from 'components/Banner/Banner'
export default function Header () {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  async function loginSavedUser (token) {
    const savedUser = await UserApi.loadUser(token)
    setUser(savedUser)
    navigate('/profile')
    console.log(savedUser)
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log(token)
    if (token) {
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
