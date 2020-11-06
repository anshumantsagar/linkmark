import * as actionTypes from '../actions/action-types';

const initialState = {
    userId : null,
    token : null
}

export const reducer = ( state=initialState, actions ) => {
    switch (actions.type) {
        case actionTypes.LOGIN :
            console.log(actions.payload)
            return {
                ...state,
                userId: actions.payload.userId,
                token: actions.payload.token
            }
        default: 
            return state
    }
};