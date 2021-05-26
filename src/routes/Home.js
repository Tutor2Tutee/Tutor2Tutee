import React from 'react'
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="homepage__container">
            <h2>
                This is Home
            </h2>
            <div className="homepage__link--container">
                <Link to={'user/login'}>Login</Link>
                <Link to={'user/register'}>Register</Link>
            </div>

        </div>
    )
}

export default Home
