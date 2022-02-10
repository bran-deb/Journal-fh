import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote } from '../../store/actions/notes';

export const NotesAppbar = () => {

    const dispatch = useDispatch()
    const { active: note } = useSelector(state => state.notes);

    const handleClick = () => {
        //actualiza o guarda los datos
        dispatch(startSaveNote(note))
    }


    return (
        <div className='notes__apbar'>
            <span>28 de agosto 2022</span>

            <div>
                <button className='btn'>
                    Picture
                </button>
                <button
                    className='btn'
                    onClick={handleClick}
                >
                    Save
                </button>
            </div>
        </div>
    )
};
