import React from 'react'
import "./About.css"
import ImgSrc from './../../shared/ImgSrc'
import { useSelector } from 'react-redux'

const Home = () => {
    let language = useSelector(state => state.lang.language)

    return (
        <section className="about__container">
            <div className="about__main">
                <h1>{language === "kor" ? "Tutor2Tutee는 무엇입니까?" :"What is Tutor2Tutee?"}</h1>
                <div className="about__main--p">
                    <p>{language === "kor" ? "Tutor2Tutee는 학생 중심의 학습 및 교육 플랫폼입니다. 목표는 동료를 가르치고 동료에게 배우는 것입니다. Tutee에서 Tutor까지 무엇이든 할 수 있습니다. 프로젝트에 자유롭게 기여하십시오." :"Tutor2Tutee is an Student oriented Learning & Teaching Platform. The Goal is Teach your Fellow, Learn from your fellow. From Tutee to Tutor, You can do anything. Feel free to contribute to the project."}</p>
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
