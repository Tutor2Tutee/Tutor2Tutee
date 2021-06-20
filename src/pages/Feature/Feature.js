import React from 'react'
import './Feature.css'
import ImgSrc from './../../shared/ImgSrc'
import { useSelector } from 'react-redux'

import Locale from './../../locale/language.json'

const Feature = () => {
  let language = useSelector((state) => state.lang.language)
  let isDark = useSelector((state) => state.theme.isDark)

  return (
    <section className={`feature__container ${!isDark && 'light'}`}>
      <div className="feature__main">
        <div className="feature__info--container">
          <div className="feature__info">
            <h1 className={`feature__h1 ${!isDark && 'light'}`}>{Locale.feature.feature_recorded_head[language]}</h1>
            <p className="feature__p">{Locale.feature.feature_recorded_para[language]}</p>
          </div>
        </div>
        <div className="feature__banner">
          <img
            src={ImgSrc.recordedVideo}
            alt=" Content Owned By <a href='https://pngtree.com/so/library'>library png from pngtree.com</a> "
            className="feature__banner--img"
          />
        </div>
      </div>
      <div className="feature__main">
        <div className="feature__banner">
          <img
            src={ImgSrc.meeting}
            alt="Content Owned By <a href='https://pngtree.com/so/online-icons'>online icons png from pngtree.com</a>"
            className="feature__banner--img"
          />
        </div>
        <div className="feature__info--container">
          <div className="feature__info feature__info--paddingleft">
            <h1 className={`feature__h1 ${!isDark && 'light'}`}>{Locale.feature.feature_meeting_head[language]}</h1>
            <p className="feature__p">{Locale.feature.feature_meeting_para[language]}</p>
          </div>
        </div>
      </div>
      <div className="feature__main">
        <div className="feature__info--container">
          <div className="feature__info">
            <h1 className={`feature__h1 ${!isDark && 'light'}`}>{Locale.feature.feature_attandance_head[language]}</h1>
            <p className="feature__p">{Locale.feature.feature_attandance_para[language]}</p>
          </div>
        </div>
        <div className="feature__banner">
          <img
            src={ImgSrc.attendence}
            alt="attendence"
            className="feature__banner--img feature__banner--img__attendence"
          />
        </div>
      </div>
      <div className="feature__main">
        <div className="feature__banner">
          <img src={ImgSrc.rating} alt="rating" className="feature__banner--img" />
        </div>
        <div className="feature__info--container">
          <div className="feature__info feature__info--paddingleft">
            <h1 className={`feature__h1 ${!isDark && 'light'}`}>{Locale.feature.feature_rating_head[language]}</h1>
            <p className="feature__p">{Locale.feature.feature_rating_para[language]}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feature
