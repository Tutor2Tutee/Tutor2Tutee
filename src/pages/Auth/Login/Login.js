import React, { useState } from 'react';
import './Login.css';
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
    const [error, setError] = useState("")
    let language = useSelector(state => state.lang.language)


    const dispatch = useDispatch()

    const onAuthenticated = (token) => {
        dispatch(actionCreator.authChecker(token))
    }

    // 로그인을 수행하고 localStorage 에 jwt-token 을 저장
    const onSubmitHandler = (event) => {
        event.preventDefault()
        let isValid = inputValidator([email,password])
        if(!isValid){
            return setError("Invalid input")
        }

        fetch('/api/user/login',
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email,
                    password
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response.token) {
                    localStorage.setItem('t2t-token', response.token)
                    onAuthenticated(response.token)
                }
            })
    }

    const isAuth = useSelector(state => state.auth.isAuthenticated)

    if(isAuth){
        return <Redirect to="/user/dashboard" />
    }

    return (
        <section className="login__container">
            <form className="login__form" onSubmit={onSubmitHandler}>
                <InputField
                value={email}
                type="email"
                placeholder={language === "kor" ? "이메일" :"Email"}
                onChange={(event) => setEmail(event.target.value)}
                />
                <InputField
                value={password}
                type="password"
                placeholder={language === "kor" ? "암호" : "Password"}
                onChange={(event) => setPassword(event.target.value)}
                />
                <p className="login__form--p">{language === "kor" ? "새로운 사용자? 좋습니다" : "New User? Great, you can "}<Link to="/signup">{language === "kor" ? "레지스터" : "Register"}</Link> {language === "kor" ? "여기" : "here."}</p>
                <button className="login__form--button" type="submit">{language === "kor" ? "로그인" : "Login"}</button>
            </form>
        </section>
    );
};

export default Login;
