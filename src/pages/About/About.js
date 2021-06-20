import React from 'react'
import './About.css'
import ImgSrc from './../../shared/ImgSrc'
import { useSelector } from 'react-redux'

import Locale from './../../locale/language.json'

const Home = () => {
  let isDark = useSelector((state) => state.theme.isDark)
  let language = useSelector((state) => state.lang.language)

  return (
    <section className={`about__container ${!isDark && 'light'}`}>
      <div className="about__main">
        <h1 className={`${!isDark && 'light'}`}>{Locale.about.about_heading[language]}</h1>
        <div className={`about__main--p ${!isDark && 'light'}`}>
          <p>{Locale.about.about_para[language]}</p>
          <a
            className={`${!isDark && 'light'}`}
            href="https://github.com/jinwoo1225/Tutor2Tutee-Advanced"
            target="_blank"
            rel="noreferrer"
          >
            <img src={ImgSrc.githubWhite} alt="github" />
          </a>
        </div>
      </div>
      <div className="about__main" style={{ padding: '0' }}>
        <h1 className={`${!isDark && 'light'}`}>Founder</h1>
        <div className="about__card">
          <h1 className={`${!isDark && 'light'}`}>Hong Jinwoo</h1>
          <p className={`${!isDark && 'light'}`}>Computer Science Student at Hankyong National University</p>
          <a className={`${!isDark && 'light'}`} href="https://github.com/jinwoo1225" target="_blank" rel="noreferrer">
            <img src={ImgSrc.githubWhite} alt="github" />
          </a>
        </div>
      </div>
      <div className="about__main" style={{ padding: '0' }}>
        <h1 className={`${!isDark && 'light'}`}>Contributor</h1>
        <div className="about__card">
          <h1 className={`${!isDark && 'light'}`}>Nikhil Sharma</h1>
          <p className={`${!isDark && 'light'}`}>Student at Reva University</p>
          <a
            className={`${!isDark && 'light'}`}
            href="https://github.com/NikhilSharma03"
            target="_blank"
            rel="noreferrer"
          >
            <img src={ImgSrc.githubWhite} alt="github" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Home
