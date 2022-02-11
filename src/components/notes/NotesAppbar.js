import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../store/actions/notes';

export const NotesAppbar = () => {

    const dispatch = useDispatch()
    const { active: note } = useSelector(state => state.notes);

    const handleSave = () => {
        //actualiza o guarda los datos
        dispatch(startSaveNote(note))
    }

    const handlePicktureClick = () => {
        document.querySelector('#fileSelector').click()
    }

    const handleFileChange = ({ target }) => {
        const file = target.files[0]
        //si hay file se manda el dispatch
        file && dispatch(startUploading(file))
    }


    return (
        <div className='notes__apbar'>
            <span>28 de agosto 2022</span>

            <input               //picture
                id='fileSelector'
                name='file'
                type='file'
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <div>
                <button
                    className='btn'
                    onClick={handlePicktureClick}
                >
                    Picture
                </button>
                <button
                    className='btn'
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
};
