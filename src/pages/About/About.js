import React, { useState, useEffect } from "react";
import "./About.css";
import ImgSrc from "./../../shared/ImgSrc";
import { useSelector } from "react-redux";

import Locale from "./../../locale/language.json";
import GithubCard from "./../../component/UI/GithubCard/GithubCard";

const Home = () => {
  let isDark = useSelector((state) => state.theme.isDark);
  let language = useSelector((state) => state.lang.language);
  const [jinWooData, setjinWooData] = useState({});
  const [nikhilData, setNikhilData] = useState({});

  useEffect(() => {
    fetch("https://api.github.com/users/jinwoo1225")
      .then((res) => res.json())
      .then((resData) => {
        setjinWooData(resData);
      });
    fetch("https://api.github.com/users/NikhilSharma03")
      .then((res) => res.json())
      .then((resData) => {
        setNikhilData(resData);
      });
  }, []);

  console.log(jinWooData);
  console.log(nikhilData);

  return (
    <section className={`about__container ${!isDark && "light"}`}>
      <div className="about__main">
        <h1 className={`${!isDark && "light"}`}>
          {Locale.about.about_heading[language]}
        </h1>
        <div className={`about__main--p ${!isDark && "light"}`}>
          <p>{Locale.about.about_para[language]}</p>
          <a
            className={`${!isDark && "light"}`}
            href="https://github.com/jinwoo1225/Tutor2Tutee-Advanced"
            target="_blank"
            rel="noreferrer"
          >
            <img src={ImgSrc.githubWhite} alt="github" />
          </a>
        </div>
      </div>

      <div className="about__main" style={{ padding: "0" }}>
        <h1 className={`${!isDark && "light"}`}>Founder</h1>
        <GithubCard
          isdark={isDark}
          htmlURL={jinWooData["html_url"]}
          avatarURL={jinWooData["avatar_url"]}
          name={jinWooData["name"]}
          login={jinWooData["login"]}
          bio={jinWooData["bio"]}
          followers={jinWooData["followers"]}
          following={jinWooData["following"]}
          public_repos={jinWooData["public_repos"]}
        />
      </div>

      <div className="about__main" style={{ padding: "0" }}>
        <h1 className={`${!isDark && "light"}`}>Contributor</h1>
        <GithubCard
          isdark={isDark}
          htmlURL={nikhilData["html_url"]}
          avatarURL={nikhilData["avatar_url"]}
          name={nikhilData["name"]}
          login={nikhilData["login"]}
          bio={nikhilData["bio"]}
          followers={nikhilData["followers"]}
          following={nikhilData["following"]}
          public_repos={nikhilData["public_repos"]}
        />
      </div>
    </section>
  );
};

export default Home;
