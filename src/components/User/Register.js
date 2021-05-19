import {useState} from "react";

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

    return (
        <form>
            <label>email :
            <input
                type={'text'}
                value={email}
                onChange={event => {setEmail(event.target.value)}}
            />
            </label>
            <br/>
            <label>
                password :
                <input
                    type = {'text'}
                    value = {password}
                    onChange={event => {setPassword(event.target.value)}}
                />
            </label>
            <br/>
            <label>
                nickname :
                <input
                    type={'text'}
                    value={nickname}
                    onChange={event => {setNickname(event.target.value)}}
                    />
            </label>
            <br/>
            <label>
                birth (YYYY-MM-DD) :
                <input
                    type={'text'}
                    value = {birth}
                    onChange={event => {setBirth(event.target.value)}}
                    />
            </label>
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