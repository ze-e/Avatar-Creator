import React, { useContext, useEffect } from 'react'
import { UserContext } from 'contexts/UserContext'
import { useNavigate } from 'react-router-dom'

import MainNav from 'components/MainNav/MainNav'
import Banner from 'components/Banner/Banner'
export default function Header () {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'))
    if (savedUser) {
      setUser(savedUser)
      navigate('/profile')
    }
  }, [])

  return (
    <div className="header">
      <Banner />
      <MainNav />
    </div>
  )
}
