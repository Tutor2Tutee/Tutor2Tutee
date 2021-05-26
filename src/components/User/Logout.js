import * as actionCreator from './../../store/actions/auth'
import { useDispatch } from 'react-redux'

const Logout = () => {
    const dispatch = useDispatch()

    const onLogOut = () => {
        dispatch(actionCreator.logOut())
    }

    return (
        <button className="header__container--btn" onClick={event => {
            // event.preventDefault()
            localStorage.removeItem('t2t-token')
            onLogOut()
        }}>Logout</button>
    )
}

export default Logout