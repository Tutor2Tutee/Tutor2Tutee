import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavLinks.css"

export default function NavLinks(props){
    return (
        <li className="header__nav--li"><NavLink activeStyle={{color: props.sd ? "var(--light-primary-purple)" : "var(--light-primary-purple-dark)"}} to={`${props.href}`} exact={true}>{props.children}</NavLink></li>
    )
}