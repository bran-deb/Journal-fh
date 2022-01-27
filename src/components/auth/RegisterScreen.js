import React from 'react';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    //extraemos solo el mensaje de error del estado actual del arror
    const { msgError } = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        name: 'hernando',
        email: 'email@mail.com',
        password: 123456,
        password2: 123456
    })
    const { name, email, password, password2 } = formValues


    const handleRegister = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            console.log('Formulario correcto');
        }

    }

    const isFormValid = () => {

        if (name.trim().length === 0) {
            dispatch(setError('Name is required'));
            return false
        } else if (!validator.isEmail(email)) {
            dispatch(setError('email is not valid'));
            return false
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError('password should be at least 6 characters and match each other'));
            return false
        }
        else if (dispatch(removeError())) {
            return true
        }
    }

    return (
        <>
            <h3 className='auth__title'>Register</h3>
            <form onSubmit={handleRegister}>
                {
                    msgError &&
                    <div className='auth__alert-error'>
                        {msgError}
                    </div>
                }
                <input
                    autoComplete='none'
                    type='text'
                    placeholder='Name'
                    name='name'
                    className='auth__input'
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    autoComplete='off'
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
                    autoComplete='off'
                    value={password}
                    onChange={handleInputChange}

                />
                <input
                    type='password'
                    placeholder='Confirm'
                    name='password2'
                    className='auth__input'
                    autoComplete='off'
                    value={password2}
                    onChange={handleInputChange}

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
