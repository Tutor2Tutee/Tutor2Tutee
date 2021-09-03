import * as actionTypes from './actionTypes';

export const authChecker = (token) => {
    return {
        type: actionTypes.AUTH_CHECKER,
        token,
    };
};

export const logOut = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};
