import React from 'react'
import './Nav.css'
import { useSelector } from 'react-redux'

import NavLink from './../UI/NavLink/NavLinks'

export default function Nav(props){
    let isAuth = useSelector(state => state.auth.isAuthenticated)

    return (
        <nav className="header__nav">
            <ul className="header__ul">
                <NavLink href="/" >Home</NavLink>
                <NavLink href="/feature" >Feature</NavLink>
                <NavLink href="/about" >About</NavLink>
                {
                    isAuth && (<React.Fragment> 
                    <NavLink href="/classes" >Classes</NavLink>
                    <NavLink href="/logout" >Logout</NavLink>
                    </React.Fragment>
                    )
                }
                {
                    !isAuth && (
                    <React.Fragment>
                    <NavLink href="/login" >Login</NavLink>
                    <NavLink href="/signup" >Signup</NavLink>
                    </React.Fragment>
                    )
                }
            </ul>
    </nav>
    )
}