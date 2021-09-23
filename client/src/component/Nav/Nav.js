import React from 'react';
import './Nav.css';
import { useSelector } from 'react-redux';

import NavLink from './../UI/NavLink/NavLinks';

export default function Nav(props) {
    let isAuth = useSelector((state) => state.auth.isAuthenticated);
    let language = useSelector((state) => state.lang.language);

    return (
        <nav className="header__nav">
            <ul className="header__ul">
                <NavLink href="/">{language === 'kor' ? '홈' : 'Home'}</NavLink>
                <NavLink href="/feature">
                    {language === 'kor' ? '기능' : 'Feature'}
                </NavLink>
                <NavLink href="/about">
                    {language === 'kor' ? '소개' : 'About'}
                </NavLink>
                {isAuth && (
                    <React.Fragment>
                        <NavLink href="/class">
                            {language === 'kor' ? '클래스' : 'Classes'}
                        </NavLink>
                        <NavLink href="/logout">
                            {language === 'kor' ? '로그아웃' : 'Logout'}
                        </NavLink>
                    </React.Fragment>
                )}
                {!isAuth && (
                    <React.Fragment>
                        <NavLink href="/login">
                            {language === 'kor' ? '로그인' : 'Login'}
                        </NavLink>
                        <NavLink href="/signup">
                            {language === 'kor' ? '회원가입' : 'Signup'}
                        </NavLink>
                    </React.Fragment>
                )}
            </ul>
        </nav>
    );
}
