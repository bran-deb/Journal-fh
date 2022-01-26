import { types } from '../types/types'

//accion asincrona
//esta accion dispara otra accion cuando resuelve la tarea asincrona
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(login(123, 'Pedro'))
        }, 3500);
    }
}
//accion sincrona
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})