import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { googleAuthProvider } from '../../firebase/firebase-config';
import { types } from '../../types/types'
import { finishLoading, startLoading } from './ui';



//accion async
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(user, { displayName: name })
                console.log(user);
                dispatch(login(user.uid, user.displayName))
            })
            .catch(e => {
                console.log(e);
            })
    }
}

//accion no necesariamente asincrona
//esta accion dispara otra accion cuando resuelve la tarea asincrona
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading())
        const auth = getAuth()
        console.log(auth, email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                const { uid, displayName } = user
                dispatch(login(uid, displayName))
                dispatch(finishLoading())
            })
            .catch(e => {
                console.log(e);
                console.log(e.code)
                console.log(e.message)
            })
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
    type: types.LOGIN,
    payload: {
        uid,
        displayName
    }
})