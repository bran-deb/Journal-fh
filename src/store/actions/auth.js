import Swal from 'sweetalert2';
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import { googleAuthProvider } from '../../firebase/firebase-config';
import { types } from '../../types/types'
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';



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
                Swal.fire('Error', e.message, 'error')
            })
    }
}

//accion no necesariamente asincrona
//esta accion dispara otra accion cuando resuelve la tarea asincrona
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading())
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                const { uid, displayName } = user
                dispatch(login(uid, displayName))
                dispatch(finishLoading())
            })
            .catch(e => {
                console.log(e)
                dispatch(finishLoading())   //termina loading en caso de error
                Swal.fire('Error', e.message, 'error')
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

//funcion async para firebase
export const startLogout = () => {
    return async (dispatch) => {
        const auth = getAuth()
        //firebase method to logout
        await signOut(auth)
        dispatch(logout())
        dispatch(noteLogout())

    }
};

export const logout = () => {
    return {
        type: types.LOGOUT,
    }
};
