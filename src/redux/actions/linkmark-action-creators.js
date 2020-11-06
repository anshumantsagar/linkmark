import * as actionTypes from './action-types';

export const login = (userDetails) => {
    return {
        type : actionTypes.LOGIN,
        payload : userDetails
    }
}

export const logout = () => {
    return {
        type : actionTypes.LOGOUT
    }
}