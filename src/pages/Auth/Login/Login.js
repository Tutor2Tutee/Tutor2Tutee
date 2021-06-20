import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actionCreator from './../../../store/actions/auth'

import InputField from './../../../component/UI/InputField/InputField'
import Locale from './../../../locale/language.json'

const inputValidator = (field) => {
  let isValid = true

  field.forEach((item) => {
    if (item.length === 0) {
      isValid = false
    }
  })

  return isValid
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  let isDark = useSelector((state) => state.theme.isDark)
  let language = useSelector((state) => state.lang.language)

  const dispatch = useDispatch()

  const onAuthenticated = (token) => {
    dispatch(actionCreator.authChecker(token))
  }

  // 로그인을 수행하고 localStorage 에 jwt-token 을 저장
  const onSubmitHandler = (event) => {
    event.preventDefault()
    let isValid = inputValidator([email, password])
    if (!isValid) {
      return setError('Invalid input')
    }

    fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.token) {
          localStorage.setItem('t2t-token', response.token)
          onAuthenticated(response.token)
        }
      })
  }

  const isAuth = useSelector((state) => state.auth.isAuthenticated)

  if (isAuth) {
    return <Redirect to="/user/dashboard" />
  }

  return (
    <section className={`login__container ${!isDark && 'light'}`}>
      <form className="login__form" onSubmit={onSubmitHandler}>
        <InputField
          value={email}
          type="email"
          placeholder={Locale.login.login_email[language]}
          onChange={(event) => setEmail(event.target.value)}
        />
        <InputField
          value={password}
          type="password"
          placeholder={Locale.login.login_password[language]}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p className="login__form--p">
          {Locale.login.login_signup_redirect_1[language]}
          <Link to="/signup">{Locale.login.login_signup_redirect_2[language]}</Link>{' '}
          {Locale.login.login_signup_redirect_3[language]}
        </p>
        <button className="login__form--button" type="submit">
          {Locale.login.login_button[language]}
        </button>
      </form>
    </section>
  )
}

export default Login
