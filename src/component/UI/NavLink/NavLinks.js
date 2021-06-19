import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavLinks.css'

export default function NavLinks(props) {
  return (
    <li className="header__nav--li">
      <NavLink activeStyle={{ color: 'var(--light-primary-purple)' }} to={`${props.href}`} exact={true}>
        {props.children}
      </NavLink>
    </li>
  )
}
