import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
    return (
        <>
            <h3 className='auth__title'>Register</h3>
            <form>
                <input
                    autoComplete='none'
                    type='text'
                    placeholder='Name'
                    name='Name'
                    className='auth__input'
                />
                <input
                    autoComplete='off'
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    autoComplete='off'
                />
                <input
                    type='password'
                    placeholder='Confirm'
                    name='password2'
                    className='auth__input'
                    autoComplete='off'
                />
                <button
                    type='submit'
                    className='btn btn-primary btn-block mb-5'
                >
                    login
                </button>

                <Link
                    to='/auth/login'
                    className='link'
                >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
