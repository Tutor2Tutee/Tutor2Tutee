import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';

export default function NavLinks(props) {
    let isDark = useSelector((state) => state.theme.isDark);
    return (
        <li className="header__nav--li">
            <NavLink
                className={`nav-link ${!isDark && 'light'}`}
                to={`${props.href}`}
                exact={true}
            >
                {props.children}
            </NavLink>
        </li>
    );
}
