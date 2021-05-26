import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Home = () => {
    const isAuth = useSelector(state => state.auth.isAuthenticated)
    
    if(!isAuth){
        return <Redirect to="/" />
    }

    return (
        <div className="homepage__container">
            <h2>
                Hey There! You are Authenticated.
            </h2>
        </div>
    )
}

export default Home