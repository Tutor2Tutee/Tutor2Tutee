import React from 'react'
import "./About.css"
import ImgSrc from './../../shared/ImgSrc'
import { useSelector } from 'react-redux'

import Locale from './../../locale/language.json'

const Home = () => {
    let language = useSelector(state => state.lang.language)

    return (
        <section className="about__container">
            <div className="about__main">
                <h1>{Locale.about.about_heading[language]}</h1>
                <div className="about__main--p">
                    <p>{Locale.about.about_para[language]}</p>
                    <a href="https://github.com/jinwoo1225/Tutor2Tutee-Advanced" target="_blank" rel="noreferrer">
                        <img src={ImgSrc.githubWhite} alt="github" />
                    </a>
                </div>
            </div>
            <div className="about__main" style={{padding:'0'}}>
                <h1>Founder</h1> 
                <div className="about__card">
                    <h1>Hong Jinwoo</h1>
                    <p>Computer Science Student at Hankyong National University</p>
                    <a href="https://github.com/jinwoo1225" target="_blank" rel="noreferrer">
                        <img src={ImgSrc.githubWhite} alt="github" />
                    </a>
                </div>
            </div>
            <div className="about__main" style={{padding:'0'}}>
                <h1>Contributor</h1> 
                <div className="about__card">
                    <h1>Nikhil Sharma</h1>
                    <p>Student at Reva University</p>
                    <a href="https://github.com/NikhilSharma03" target="_blank" rel="noreferrer">
                        <img src={ImgSrc.githubWhite} alt="github" />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Home
