import { types } from "../../types/types";

export const setError = (err) => ({
    type: types.UISETERROR,
    payload: err
})

export const removeError = () => ({
    type: types.UIREMOVEERROR
})

export const startLoading = () => ({
    type: types.UISTARTLOADING
})

export const finishLoading = () => ({
    type: types.UIFINISHLOADING
})