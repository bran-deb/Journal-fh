import { types } from "../../types/types";


const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UI_SET_ERROR:
            return {
                ...state,
                msgError: action.payload
            }

        case types.UI_REMOVE_ERROR:
            return {
                ...state,
                msgError: null
            }

        case types.UI_START_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.UI_FINISH_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}