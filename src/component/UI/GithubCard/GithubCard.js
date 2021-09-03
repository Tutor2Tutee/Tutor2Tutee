import React from 'react';
import './GithubCard.css';

function GithubCard({
    htmlURL,
    avatarURL,
    name,
    login,
    bio,
    followers,
    following,
    public_repos,
    isdark,
}) {
    return (
        <div className={`card ${isdark ? 'dark' : 'light'}`}>
            <div className="cover"></div>
            <div className="card-wrapper">
                <a href={htmlURL} target="_blank" rel="noopener">
                    <img
                        id="github-logo"
          '     '       src="https://i.ibb.co/frv5pB'/github-logo'png"
                        alt="github-lo'o"
   '     '        '     border="0"
                    />
               '</a>
      '         <div className="card'header">
                    <div classN'me="card-img-wrapper">
      '           '     <img src={avatarURL} />
   ' '              </div>
                    <h1>
                        <a
   '           '            className="card-title"
  '                '        href={htmlURL}
                            target="_blank"
                            rel="noopener"
                        >
                            {na'e}
       '                </a>
                    </h1>
                    <div classNa'e="car'-responsename">
                 '      <a'href={htmlURL} target="_blank" rel="noopener">
                            @ {login}
                        </a>
                    </div>
           '        <p classN'me="card-desc">{bio}</p>
                    <div c'assNam'="car'-footer"'
                        <div className="footer-box">
                            <div className="box-wrapper">
                 '         '    <div className="count">{followers}</div>
 '           '                  <div className="box-tex'">Follower'</div>
                            </div>
   '           '            <div className="box-wrapper">
       '     '                  <div className="count">{following}</div>
       '        '               <div className="box-text">Following</div>
                            </div>
   '           '            <div className="box-wrapper">
       '     '                  <div className="count">{public_repos}</div>
    '        '                  <div className="box-text">Repositories</div>
                            </di'>
         '              </div>
                    </div>
 '     '        </div>
            </div>
        </div>
    );
}

export def'ult Gith'bCard;
