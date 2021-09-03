import React, { useState } from 'react';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';

import ImgSrc from './../../shared/ImgSrc';
import Nav from './../Nav/Nav';
import * as actionCreator from './../../store/actions/language';
import toggleTheme from './../../store/actions/theme';

const Header = (props) => {
    const [showLang, setShowLang] = useState(false);

    let language = useSelector((state) => state.lang.language);
    let isDark = useSelector((state) => state.theme.isDark);

    const dispatch = useDispatch();

    const languageHandler = (lang) => {
        dispatch(actionCreator.toggleLang(lang));
    };
    const handleThemeBtn = () => {
        dispatch(toggleTheme());
    };

    return (
        <header className={`header ${!isDark && 'light'}`}>
            <div>
                <h1 className={`header__h1 ${!isDark && 'light'}`}>
                    Tutor
                    <label
                        className={`header__h1--label ${!isDark && 'light'}`}
                    >
                        2
                    </label>
                    Tutee
                </h1>
            </div>
            <div className={`header__lang--container ${!isDark && 'light'}`}>
                <div
                    className="header__lang--main"
                    onClick={() => setShowLang((prev) => !prev)}
                >
                    <div>
                        <img src={ImgSrc.translate} />
                    </div>
                    <h1>{language === 'kor' ? '언어' : 'Language'}</h1>
                </div>
                {showLang && (
                    <div
                        className={`header__lang--option ${!isDark && 'light'}`}
                        onClick={() => setShowLang((prev) => !prev)}
                    >
                        <button
                            className={`${!isDark && 'light'}`}
                            onClick={languageHandler.bind(this, 'kor')}
                        >
                            한국어
                        </button>
                        <button
                            className={`${!isDark && 'light'}`}
                            onClick={languageHandler.bind(this, 'en')}
                        >
                            English
                        </button>
                    </div>
                )}
            </div>
            {/* Theme toggler */}
            <div
                onClick={handleThemeBtn}
                className={`theme-btn ${!isDark ? 'light' : 'dark'}`}
            >
                <button
                    className={`slider ${!isDark ? 'light' : 'dark'}`}
                ></button>
                <h1 className={!isDark && 'light'}>
                    {isDark
                        ? language === 'kor'
                            ? '어두운'
                            : 'Dark'
                        : language == 'kor'
                        ? '빛'
                        : 'Light'}
                </h1>
            </div>
            <div onClick={props.toggleSD} className="header_toggle--btn">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Nav />
        </header>
    );
};

export default Header;
