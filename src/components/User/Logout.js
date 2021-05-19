const Logout = () => {
    return (
        <button onClick={event => {
            // event.preventDefault()
            localStorage.removeItem('t2t-token')
        }}>Logout</button>
    )
}

export default Logout