import React from 'react'
import "./About.css"
import ImgSrc from './../../shared/ImgSrc'
import { useSelector } from 'react-redux'

const Home = () => {
    let language = useSelector(state => state.lang.language)

    return (
        <section className="about__container">
            <div className="about__main">
                <h1>{language === "kor" ? "Tutor2Tutee란?" :"What is Tutor2Tutee?"}</h1>
                <div className="about__main--p">
                    <p>{language === "kor" ? "Tutor2Tutee는 대학생용 지식공유 플랫폼입니다. 함께 배우고 가르쳐보세요! 어떤 것이든 가르치고 배울수 있어요!" :"Tutor2Tutee is an Student oriented Learning & Teaching Platform. The Goal is Teach your Fellow, Learn from your fellow. From Tutee to Tutor, You can do anything. Feel free to contribute to the project."}</p>
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
