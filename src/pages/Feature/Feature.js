import React from 'react'
import "./Feature.css"
import ImgSrc from './../../shared/ImgSrc'

const Feature = () => {
    return (
        <section className="feature__container">
            <div className="feature__main">
                <div className="feature__info--container">
                    <div className="feature__info">
                        <h1 className="feature__h1">Recorded Video</h1>
                        <p className="feature__p">Utilize the recorded video in your free time to learn Something New</p>
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
                        <h1 className="feature__h1">Online & Offline Meeting</h1>
                        <p className="feature__p">Offline & Online meeting realtime meeting on Zoom or Skype</p>
                    </div>
                </div>
            </div>
            <div className="feature__main">
                <div className="feature__info--container">
                    <div className="feature__info">
                        <h1 className="feature__h1">Attendence Checking</h1>
                        <p className="feature__p">Attendence Checking To Evaluate Tutee</p>
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
                        <h1 className="feature__h1">Rating</h1>
                        <p className="feature__p">Tutor Rating System, Used By Tutee To Improve Class Quality</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Feature
