import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm'
import { startGoogleLogin, startLoginEmailPassword } from '../../store/actions/auth'
import validator from 'validator';
import { removeError, setError } from '../../store/actions/ui';

export const LoginScreen = () => {
    //puede mandar dispatch desde cualquier directorio
    const dispatch = useDispatch();
    //get data from ui state
    const { msgError, loading } = useSelector(state => state.ui);
    const [formValues, handleInputChange] = useForm({
        email: 'email@mail.com',
        password: '123456'
    })
    const { email, password } = formValues

    //se manda al login los datos (uid,displayname)
    const handleLogin = (e) => {
        e.preventDefault()
        //dispatch a la tarea async
        if (isFormValid()) {
            dispatch(startLoginEmailPassword(email, password))
        }
    }

    const isFormValid = () => {
        if (email.trim().length === 0) {
            dispatch(setError('email is required'))
            return false
        }
        if (!validator.isEmail(email)) {
            dispatch(setError('email is not valid'))
            return false
        }
        if (password.trim().length === 0) {
            dispatch(setError('password is required'))
            return false
        }
        dispatch(removeError())
        return true
    }

    const handleGoogleLogin = () => {
        //auth with googleLogin
        dispatch(startGoogleLogin())
    }

    return (
        <>
            <h3 className='auth__title'>Login</h3>
            <form
                onSubmit={handleLogin}
                className='animate__animated animate__fadeIn animate__faster'
            >
                {
                    msgError &&
                    <div className='auth__alert-error'>{msgError}</div>
                }
                <input
                    autoComplete='true'
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={password}
                    onChange={handleInputChange}
                    autoComplete='off'
                />
                <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    disabled={loading}
                >
                    login
                </button>
                <hr />

                <div className='auth__social-networcks'>
                    <p>Login with social networks</p>
                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link
                    to='/auth/register'
                    className='link'
                >
                    Create new acount
                </Link>
            </form>
        </>
    )
}
