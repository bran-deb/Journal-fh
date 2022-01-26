import { getAuth, signInWithPopup } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
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

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth()
        signInWithPopup(auth, googleAuthProvider)
            //destructuring {user} = usercredential
            .then(({ user }) => {
                const { uid, displayName } = user
                dispatch(login(uid, displayName))
            })
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