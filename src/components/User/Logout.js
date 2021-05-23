const Logout = () => {
    return (
        <button className="header__container--btn" onClick={event => {
            // event.preventDefault()
            localStorage.removeItem('t2t-token')
        }}>Logout</button>
    )
}

export default Logout