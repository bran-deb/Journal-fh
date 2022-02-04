import { getAuth, onAuthStateChanged } from '@firebase/auth';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../store/actions/auth';
import { startLoadingNotes } from '../store/actions/notes';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    //estado del loading
    const [checking, setChecking] = useState(true);
    //verifica si esta logeado
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //se renderiza solo la primera vez y obtiene el uid y name
    //se utiliza para mantener el estado de la autenticacion
    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, async (user) => {
            //si user contiene algo pregunta si existe el uid
            if (user?.uid) {
                const { uid, displayName } = user

                dispatch(login(uid, displayName))
                setIsLoggedIn(true)
                dispatch(startLoadingNotes(uid))
            } else {
                setIsLoggedIn(false)
            }
            setChecking(false)
        })
    }, [dispatch, setChecking, setIsLoggedIn])


    if (checking) {
        return (
            <h1 className='auth__main '
            >
                Loading...
            </h1>
        )
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/auth/*'
                        element={
                            <PublicRoute isAuthenticated={isLoggedIn}>
                                <AuthRouter />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path='/'
                        element={
                            <PrivateRoute isAuthenticated={isLoggedIn}>
                                <JournalScreen />
                            </PrivateRoute>
                        } />

                    <Route path='*' element={<LoginScreen />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};
