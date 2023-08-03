import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from 'contexts/UserContext'

export default function MainNav () {
  const { user } = useContext(UserContext)
  const { pathname } = useLocation()

  const gearPage = Boolean(pathname.includes('/gear'))
  return !!user.data ? (<nav className={`mainNav ${!!gearPage && 'mainNav--gear'}`}>
      {gearPage && (
        <ul className="mainNav__items">
          <li className="mainNav__item">
            <NavLink
              className={`mainNav__link m-navLink ${(isActive) =>
                isActive && 'active'}`}
              to="./gear/inventory"
            >
              {' '}
              <button className="m-button">Inventory </button>
            </NavLink>
          </li>
          <li className="mainNav__item">
            <NavLink
              className={`mainNav__link m-navLink ${(isActive) =>
                isActive && 'active'}`}
              to="./gear/store"
            >
              {' '}
              <button className="m-button">Store </button>
            </NavLink>
          </li>
        </ul>
      )}
      <ul className="mainNav__items ">
        <li className="mainNav__item">
          <NavLink
            className={`mainNav__navLink m-navLink ${(isActive) =>
              isActive && 'active'}`}
            to="./profile"
          >
            {' '}
            <button className="m-button"> Profile </button>
          </NavLink>
        </li>
        <li className="mainNav__item">
          <NavLink
            className={`mainNav__navLink m-navLink ${(isActive) =>
              isActive && 'active'}`}
            to="./gear/inventory"
          >
            <button className="m-button">Gear</button>
          </NavLink>
        </li>
        <li className="mainNav__item">
          <NavLink
            className={`mainNav__navLink m-navLink ${(isActive) =>
              isActive && 'active'}`}
            to="./skills"
          >
            <button className="m-button">Skills</button>
          </NavLink>
        </li>
        {user?.admin?.userType === 'teacher' && (
          <li className="mainNav__item">
            <NavLink
              className={`mainNav__navLink m-navLink ${(isActive) =>
                isActive && 'active'}`}
              to="./users"
            >
              <button className="m-button">Users</button>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>) : null
}
