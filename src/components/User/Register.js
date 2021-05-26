import {useState} from "react";
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');

    const send = ()=> {
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
        <form className="form">
            
            <label htmlFor="email">email :</label>
            <input
            id="email"
                type={'text'}
                value={email}
                onChange={event => {setEmail(event.target.value)}}
            />
            <br/>
            <label htmlFor="password">
                password :</label>
                <input
                id="password"
                    type = {'text'}
                    value = {password}
                    onChange={event => {setPassword(event.target.value)}}
                />
            
            <br/>
            <label htmlFor="nickname">
                nickname :</label>
                <input
                id="nickname"
                    type={'text'}
                    value={nickname}
                    onChange={event => {setNickname(event.target.value)}}
                    />
            
            <br/>
            <label htmlFor="dob">
                birth (YYYY-MM-DD) :</label>
                <input
                    id="dob"
                    type={'text'}
                    value = {birth}
                    onChange={event => {setBirth(event.target.value)}}
                    />
            
            <br/>
            <button onClick={event => {
                event.preventDefault()
                send()
            }
            }>Submit</button>
        </form>
    )
}

export default Register