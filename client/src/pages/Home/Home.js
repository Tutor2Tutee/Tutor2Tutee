import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import ImgSrc from './../../shared/ImgSrc';
import { useSelector } from 'react-redux';

import Locale from './../../locale/language.json';

const Home = () => {
    let language = useSelector((state) => state.lang.language);
    let isDark = useSelector((state) => state.theme.isDark);

    return (
        <section className={`home__container ${!isDark && 'light'}`}>
            <div className="home__main">
                <div className="home__info--container">
                    <div className="home__info">
                        <h1 className={`home__h1 ${!isDark && 'light'}`}>
                            {Locale.home.home_heading[language]}
                        </h1>
                        <p className="home__p">
                            {Locale.home.home_para[language]}
                        </p>
                        <Link
                            to="/login"
                            className={`home__button ${!isDark && 'light'}`}
                        >
                            {Locale.home.home_button[language]}
                        </Link>
                    </div>
                </div>
                <div className="home__banner">
                    <img
                        src={ImgSrc.homeBanner}
                        alt="Content Owned By <a href='https://pngtree.com/so/reading-clipart'>reading clipart png from pngtree.com</a>"
                        className="home__banner--img"
                    />
                </div>
            </div>
        </section>
    );
};

export default Home;
