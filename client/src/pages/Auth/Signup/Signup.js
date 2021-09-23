import React, { useState } from 'react';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ImagePicker from './../../../component/UI/ImagePicker/ImagePicker';
import InputField from './../../../component/UI/InputField/InputField';
import Locale from './../../../locale/language.json';

const inputValidator = (field) => {
    let isValid = true;

    field.forEach((item) => {
        if (item.length === 0) {
            isValid = false;
        }
    });

    return isValid;
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');
    const [error, setError] = useState('');
    const [profile, setProfile] = useState({ value: null, valid: false });

    let isDark = useSelector((state) => state.theme.isDark);
    let language = useSelector((state) => state.lang.language);

    const imageHandler = (image, valid) => {
        setProfile({ value: image, valid });
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let isValid = inputValidator([email, password, nickname, birth]);
        if (!isValid) {
            return setError('Invalid input');
        }

        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('nickname', nickname);
        data.append('birth', birth);
        data.append('profile', profile);

        fetch('/api/user/register', {
            method: 'POST',
            body: data,
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status === 201) {
                    // do something
                    console.log('response is 201');
                }
            });
    };

    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    if (isAuth) {
        return <Redirect to="/user/dashboard" />;
    }

    return (
        <section className={`signup__container ${!isDark && 'light'}`}>
            <form
                className={`signup__form ${!isDark && 'light'}`}
                onSubmit={onSubmitHandler}
            >
                <InputField
                    isdark={isDark}
                    value={email}
                    type="email"
                    placeholder={Locale.signup.signup_email[language]}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <InputField
                    isdark={isDark}
                    value={password}
                    type="password"
                    placeholder={Locale.signup.signup_password[language]}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <InputField
                    isdark={isDark}
                    value={nickname}
                    type="text"
                    placeholder={Locale.signup.signup_nickname[language]}
                    onChange={(event) => setNickname(event.target.value)}
                />
                <InputField
                    isdark={isDark}
                    value={birth}
                    type="text"
                    placeholder={Locale.signup.signup_birth[language]}
                    onChange={(event) => setBirth(event.target.value)}
                />
                <ImagePicker
                    onPick={(image, valid) => imageHandler(image, valid)}
                />
                <p className="signup__form--p">
                    {Locale.signup.signup_login_redirect_1[language]}{' '}
                    <Link to="/login">
                        {Locale.signup.signup_login_redirect_2[language]}
                    </Link>{' '}
                    {Locale.signup.signup_login_redirect_3[language]}.
                </p>
                <button className="signup__form--button" type="submit">
                    {Locale.signup.signup_button[language]}
                </button>
            </form>
        </section>
    );
};

export default Login;
