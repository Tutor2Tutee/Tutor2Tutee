import React from 'react'
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h2>
                This is Home
            </h2>
            <Link to={'user/login'}>Login</Link>
            <br/>
            <Link to={'user/register'}>Register</Link>

        </div>
    )
}

export default Home
