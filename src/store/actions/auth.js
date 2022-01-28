import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { googleAuthProvider } from '../../firebase/firebase-config';
import { types } from '../../types/types'



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
        const auth = getAuth()
        console.log(auth, email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then((usercredential) => {
                console.log(usercredential);
                // const { uid, displayName } = user
                // dispatch(login(uid, displayName))
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
    type: types.login,
    payload: {
        uid,
        displayName
    }
})