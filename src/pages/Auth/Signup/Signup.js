import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

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

    let language = useSelector(state => state.lang.language)

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
                placeholder={language === "kor" ? "이메일" :"Email"}
                onChange={(event) => setEmail(event.target.value)}
                />
                <InputField
                value={password}
                type="password"
                placeholder={language === "kor" ? "비밀번호" : "Password"}
                onChange={(event) => setPassword(event.target.value)}
                />
                <InputField
                value={nickname}
                type="text"
                placeholder={language === "kor" ? "별명" : "Nickname"}
                onChange={(event) => setNickname(event.target.value)}
                />
                <InputField
                value={birth}
                type="text"
                placeholder={language === "kor" ? "생일(YYYY-MM-DD)" : "Birth (YYYY-MM-DD)"}
                onChange={(event) => setBirth(event.target.value)}
                />
                <p className="signup__form--p">{language === "kor" ? "이미 회원가입이 되어있으시면 " : "Already a User, you can"} <Link to="/login">{language === "kor" ? "로그인" : "Login"}</Link> {language === "kor" ? "하세요!" : "here"}.</p>
                <button className="signup__form--button" type="submit">{language === "kor" ? "레지스터" : "Register"}</button>
            </form>
        </section>
    );
};

export default Login;
