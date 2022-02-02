import { types } from "../../types/types";

export const setError = (err) => ({
    type: types.UI_SET_ERROR,
    payload: err
})

export const removeError = () => ({
    type: types.UI_REMOVE_ERROR
})

export const startLoading = () => ({
    type: types.UI_START_LOADING
})

export const finishLoading = () => ({
    type: types.UI_FINISH_LOADING
})