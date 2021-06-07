import React from 'react'
import ReactDOM from 'react-dom'
import './SideDrawer.css'
import { useSelector } from 'react-redux'

import NavLink from './../UI/NavLink/NavLinks'


const SideDrawer = (props) => {
    let isAuth = useSelector(state => state.auth.isAuthenticated)

    const Drawer = (
        <nav style={{transform:props.showSD ? 'translateX(0)':'translateX(-120%)'}} className="sidedrawer__container">
            <ul onClick={props.toggleSD}>
                <NavLink sd={true} href="/" >Home</NavLink>
                <NavLink sd={true} href="/feature" >Feature</NavLink>
                <NavLink sd={true} href="/about" >About</NavLink>
                {
                    isAuth && (<React.Fragment> 
                    <NavLink sd={true} href="/classes" >Classes</NavLink>
                    <NavLink sd={true} href="/logout" >Logout</NavLink>
                    </React.Fragment>
                    )
                }
                {
                    !isAuth && (
                    <React.Fragment>
                    <NavLink sd={true} href="/login" >Login</NavLink>
                    <NavLink sd={true} href="/signup" >Signup</NavLink>
                    </React.Fragment>
                    )
                }
            </ul>
        </nav>
    )

    return ReactDOM.createPortal(Drawer,document.getElementById("sd"))
}

export default SideDrawer