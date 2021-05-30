import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actionCreator from './../../../store/actions/auth'

import InputField from './../../../component/UI/InputField/InputField';

const inputValidator = (field) => {
    let isValid = true

    field.forEach(item => {
        if(item.length === 0){
            isValid = false
        }
    })

    return isValid
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');
    const [error, setError] = useState("")

    const onSubmitHandler = (event) => {
        event.preventDefault()

        let isValid = inputValidator([email,password,nickname,birth])
        if(!isValid){
            return setError("Invalid input")
        }

        event.preventDefault()
        fetch('/api/user/register',
        {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email,
                password,
                nickname,
                birth
            })
        })
        .then(response => response.json())
        .then(response => {
            if(response.status === 201){
                // do something
                console.log('response is 201')
            }
        })
    }

    const isAuth = useSelector(state => state.auth.isAuthenticated)

    if(isAuth){
        return <Redirect to="/user/dashboard" />
    }


    return (
        <section className="signup__container">
            <form className="signup__form" onSubmit={onSubmitHandler}>
                <InputField
                value={email}
                type="email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                />
                <InputField
                value={password}
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                />
                <InputField
                value={nickname}
                type="text"
                placeholder="Nickname"
                onChange={(event) => setNickname(event.target.value)}
                />
                <InputField
                value={birth}
                type="text"
                placeholder="Birth (YYYY-MM-DD)"
                onChange={(event) => setBirth(event.target.value)}
                />
                <p className="signup__form--p">Already a User, you can <Link to="/login">Login</Link> here.</p>
                <button className="signup__form--button" type="submit">Register</button>
            </form>
        </section>
    );
};

export default Login;
