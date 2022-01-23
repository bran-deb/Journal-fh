import React from 'react';

export const LoginScreen = () => {
    return (
        <>
            <h3>login</h3>

            <form>
                <input
                    type='text'
                    placeholder='mail'
                    name='email'
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                />
                <button
                    type='submit'
                >
                    login
                </button>
                <hr />
                Google
            </form>
        </>
    )
}
