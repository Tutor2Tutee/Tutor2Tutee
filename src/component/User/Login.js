import React, {useState} from 'react'


const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // const enterKey = () => {
    //     if (window.Event.keyCode === 13) {
    //         login()
    //     }
    // }

    // 로그인을 수행하고 localStorage에 jwt-token을 저장
    const login = () => {
        fetch('/api/user/login',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response.token) {
                    localStorage.setItem('t2t-token', response.token)
                }
            })
    }

    return (
        <form>
            <label>
                email : <input type={'text'} value={email} onChange={(e) => {
                setEmail(e.target.value)
            }}/><br/>
                password : <input type={'text'} value={password} onChange={(e) => {
                setPassword(e.target.value)
            }}/>
            </label>

            <button onClick={event => {
                event.preventDefault()
                login()
            }}>
                <br/>SubmitButton
            </button>
        </form>
    )
}

export default LoginPage