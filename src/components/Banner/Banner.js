import React from 'react'
import LoginButton from '../LoginButton/LoginButton'
import { Link } from 'react-router-dom'
export default function Banner () {
  return (
    <div className="banner">
      <div>
      <Link className="banner__text" to="/">
        CodeQuest
        </Link>
        <h2 className="banner__subtitle">Avatar Creator</h2>
        </div>
      <div className="banner__loginButton">
        <LoginButton />
      </div>
    </div>
  )
}
