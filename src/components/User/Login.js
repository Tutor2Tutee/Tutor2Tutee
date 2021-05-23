import React, {useState} from 'react'


const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // const enterKey = () => {
    //     if (window.Event.keyCode === 13) {
    //         login()
    //     }
    // }

    // 로그인을 수행하고 localStorage 에 jwt-token 을 저장
    const login = () => {
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
                }
            })
    }

    return (
        <form className="form">
            <label htmlFor="email">
                email :</label>
                <input
                id="email"
                    type={'text'}
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value)
                    }}
                /><br/>
            <label htmlFor="password">password :
            </label>    
                <input
                id="password"
                    type={'text'}
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value)
                    }}/>

            <button onClick={event => {
                event.preventDefault()
                login()
            }}>
                Submit
            </button>
        </form>
    )
}

export default LoginPage