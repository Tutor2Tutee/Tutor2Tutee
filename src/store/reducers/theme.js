const initialState = {
    isDark: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'toggle_theme':
            return {
                isDark: !state.isDark,
            };
        default:
            return state;
    }
};

export default reducer;
