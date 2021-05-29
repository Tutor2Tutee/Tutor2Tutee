import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
import ImgSrc from './../../shared/ImgSrc'

const Home = () => {
    return (
        <section className="home__container">
            <div className="home__main">
                <div className="home__info--container">
                    <div className="home__info">
                        <h1 className="home__h1">Knowledge Sharing Platform</h1>
                        <p className="home__p">Perfect For Collage Students</p>
                        <Link to="/login" className="home__button" >Get Started</Link>
                    </div>
                </div>
                <div className="home__banner">
                    <img src={ImgSrc.homeBanner} alt="banner" className="home__banner--img" /> 
                </div>
            </div>
        </section>
    )
}

export default Home
