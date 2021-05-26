import * as actionTypes from './../actions/actionTypes'

const initialState = {
    token:null,
    isAuthenticated:false
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.AUTH_CHECKER:
            return {
                token:action.token,
                isAuthenticated:true
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                token:null,
                isAuthenticated:false
            }
        default:return state
    }
}

export default reducer