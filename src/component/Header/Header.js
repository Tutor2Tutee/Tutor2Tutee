import React from 'react'
import "./Header.css"

import NavLink from './../UI/NavLink/NavLinks'

const Header = (props) => {
    return (
        <header className="header">
            <div><h1 className="header__h1">Tutor<label className="header__h1--label">2</label>Tutee</h1></div>
            <nav className="header__nav">
                <ul className="header__ul">
                    <NavLink href="/" >Home</NavLink>
                    <NavLink href="/classes" >Classes</NavLink>
                    <NavLink href="/feature" >Feature</NavLink>
                    <NavLink href="/about" >About</NavLink>
                    <NavLink href="/login" >Login</NavLink>
                    <NavLink href="/signup" >Signup</NavLink>
                    <NavLink href="/logout" >Logout</NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default Header;