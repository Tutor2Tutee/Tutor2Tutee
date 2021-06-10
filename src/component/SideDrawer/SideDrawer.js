import React from 'react'
import ReactDOM from 'react-dom'
import './SideDrawer.css'
import { useSelector } from 'react-redux'

import NavLink from './../UI/NavLink/NavLinks'


const SideDrawer = (props) => {
    let isAuth = useSelector(state => state.auth.isAuthenticated)
    let language = useSelector(state => state.lang.language)

    const Drawer = (
        <nav style={{transform:props.showSD ? 'translateX(0)':'translateX(-120%)'}} className="sidedrawer__container">
            <ul onClick={props.toggleSD}>
                <NavLink sd={true} href="/" >{language === "kor" ? "홈페이지" : "Home"}</NavLink>
                <NavLink sd={true} href="/feature" >{language === "kor" ? "기능" :"Feature"}</NavLink>
                <NavLink sd={true} href="/about" >{language === "kor" ? "소개" :"About"}</NavLink>
                {
                    isAuth && (<React.Fragment> 
                    <NavLink sd={true} href="/class" >{language === "kor" ? "클래스" : "Classes"}</NavLink>
                    <NavLink sd={true} href="/logout" >{language === "kor" ? "로그아웃" : "Logout"}</NavLink>
                    </React.Fragment>
                    )
                }
                {
                    !isAuth && (
                    <React.Fragment>
                    <NavLink sd={true} href="/login" >{language === "kor" ? "로그인" : "Login"}</NavLink>
                    <NavLink sd={true} href="/signup" >{language === "kor" ? "회원가입" : "Signup"}</NavLink>
                    </React.Fragment>
                    )
                }
            </ul>
        </nav>
    )

    return ReactDOM.createPortal(Drawer,document.getElementById("sd"))
}

export default SideDrawer
