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
                        src="https://i.ibb.co/frv5pB3/github-logo.png"
                        alt="github-logo"
                        border="0"
                    />
                </a>
                <div className="card-header">
                    <div className="card-img-wrapper">
                        <img src={avatarURL} />
                    </div>
                    <h1>
                        <a
                            className="card-title"
                            href={htmlURL}
                            target="_blank"
                            rel="noopener"
                        >
                            {name}
                        </a>
                    </h1>
                    <div className="card-responsename">
                        <a href={htmlURL} target="_blank" rel="noopener">
                            @ {login}
                        </a>
                    </div>
                    <p className="card-desc">{bio}</p>
                    <div className="card-footer">
                        <div className="footer-box">
                            <div className="box-wrapper">
                                <div className="count">{followers}</div>
                                <div className="box-text">Followers</div>
                            </div>
                            <div className="box-wrapper">
                                <div className="count">{following}</div>
                                <div className="box-text">Following</div>
                            </div>
                            <div className="box-wrapper">
                                <div className="count">{public_repos}</div>
                                <div className="box-text">Repositories</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GithubCard;
