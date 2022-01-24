import React from 'react';
import { NotesAppbar } from './NotesAppbar';

export const NoteScreen = () => {
    return (
        <div className='notes__main-content'>
            <NotesAppbar />
            <div className='notes__content'>
                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                />
                <textarea
                    className='notes__textarea'
                    placeholder='What happened today'
                ></textarea>
                <div className='notes__images'>
                    <img
                        src='https://th.bing.com/th/id/R.2c921f8b766300d27290c36d01cbcbfd?rik=FKCY5q%2f327y0UA&pid=ImgRaw&r=0'
                        alt='imagen'
                    />
                </div>
            </div>
        </div>
    )
};
