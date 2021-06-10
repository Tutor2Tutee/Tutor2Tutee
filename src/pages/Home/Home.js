import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
import ImgSrc from './../../shared/ImgSrc'
import { useSelector } from 'react-redux'

const Home = () => {
    let language = useSelector(state => state.lang.language)

    return (
        <section className="home__container">
            <div className="home__main">
                <div className="home__info--container">
                    <div className="home__info">
                        <h1 className="home__h1">{language === "kor" ? "대학생용 지식공유 플랫폼" :"Student Oriented Learning & Teaching Platform"}</h1>
                        <p className="home__p">{language === "kor" ? "Tutee에서 Tutor까지, 무엇이든 할 수 있어요!" : "From Tutee to Tutor, You can do anything"}</p>
                        <Link to="/login" className="home__button" >{language === "kor" ? "시작하기" : "Get Started"}</Link>
                    </div>
                </div>
                <div className="home__banner">
                    <img src={ImgSrc.homeBanner} alt="Content Owned By <a href='https://pngtree.com/so/reading-clipart'>reading clipart png from pngtree.com</a>" className="home__banner--img" /> 
                </div>
            </div>
        </section>
    )
}

export default Home
