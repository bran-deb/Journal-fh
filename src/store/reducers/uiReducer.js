import { types } from "../../types/types";


const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UISETERROR:
            return {
                ...state,
                msgError: action.payload
            }

        case types.UIREMOVEERROR:
            return {
                ...state,
                msgError: null
            }

        case types.UISTARTLOADING:
            return {
                ...state,
                loading: true
            }
        case types.UIFINISHLOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}