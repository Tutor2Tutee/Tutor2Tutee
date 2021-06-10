import React from 'react'
import "./Feature.css"
import ImgSrc from './../../shared/ImgSrc'
import { useSelector } from 'react-redux'

const Feature = () => {
    let language = useSelector(state => state.lang.language)

    return (
        <section className="feature__container">
            <div className="feature__main">
                <div className="feature__info--container">
                    <div className="feature__info">
                        <h1 className="feature__h1">{language === "kor" ? "녹화 된 비디오" :"Recorded Video"}</h1>
                        <p className="feature__p">{language === "kor" ? "여가 시간에 녹화 된 비디오를 활용하여 새로운 것을 배우십시오" : "Utilize the recorded video in your free time to learn Something New"}</p>
                    </div>
                </div>
                <div className="feature__banner">
                    <img src={ImgSrc.recordedVideo} alt=" Content Owned By <a href='https://pngtree.com/so/library'>library png from pngtree.com</a> " className="feature__banner--img" /> 
                </div>
            </div>
            <div className="feature__main">
                <div className="feature__banner">
                    <img src={ImgSrc.meeting} alt="Content Owned By <a href='https://pngtree.com/so/online-icons'>online icons png from pngtree.com</a>" className="feature__banner--img" /> 
                </div>
                <div className="feature__info--container">
                    <div className="feature__info feature__info--paddingleft">
                        <h1 className="feature__h1">{language === "kor" ? "온라인 및 오프라인 회의" :"Online & Offline Meeting"}</h1>
                        <p className="feature__p">{language === "kor" ? "Zoom 또는 Skype에서 오프라인 및 온라인 회의 실시간 회의" : "Offline & Online meeting realtime meeting on Zoom or Skype"}</p>
                    </div>
                </div>
            </div>
            <div className="feature__main">
                <div className="feature__info--container">
                    <div className="feature__info">
                        <h1 className="feature__h1">{language === "kor" ? "출석 체크" : "Attandance Checking"}</h1>
                        <p className="feature__p">{language === "kor" ? "Tutee를 평가하기위한 출석 확인" : "Attendance Checking To Evaluate Tutee"}</p>
                    </div>
                </div>
                <div className="feature__banner">
                    <img src={ImgSrc.attendence} alt="attendence" className="feature__banner--img feature__banner--img__attendence" /> 
                </div>
            </div>
            <div className="feature__main">
                <div className="feature__banner">
                    <img src={ImgSrc.rating} alt="rating" className="feature__banner--img" /> 
                </div>
                <div className="feature__info--container">
                    <div className="feature__info feature__info--paddingleft">
                        <h1 className="feature__h1">{language === "kor" ? "평가" : "Rating"}</h1>
                        <p className="feature__p">{language === "kor" ? "수업의 질을 높이기 위해 Tutee가 사용하는 교사 평가 시스템" : "Tutor Rating System, Used By Tutee To Improve Class Quality"}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Feature
