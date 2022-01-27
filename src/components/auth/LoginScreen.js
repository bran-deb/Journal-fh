import React from 'react';
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'

export const LoginScreen = () => {
    //puede mandar dispatch desde cualquier directorio
    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        email: 'email@gmail.com',
        password: 123456
    })
    const { email, password } = formValues

    //se manda al login los datos (uid,displayname)
    const handleLogin = (e) => {
        e.preventDefault()
        //dispatch a la tarea async
        dispatch(startLoginEmailPassword(email, password))
        //dispatch de la tarea sync
        // dispatch(login(12345, 'Hernando'))
    }

    const handleGoogleLogin = () => {
        //auth with googleLogin
        dispatch(startGoogleLogin())
    }

    return (
        <>
            <h3 className='auth__title'>Login</h3>
            <form onSubmit={handleLogin}>
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
