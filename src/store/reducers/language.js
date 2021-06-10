const initialState = {
    language:"kor"
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case "toggle_lang":
            return {
                language:action.lang
            }
        default:return state
    }
}

export default reducer