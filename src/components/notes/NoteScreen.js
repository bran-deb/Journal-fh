import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { NotesAppbar } from './NotesAppbar';

export const NoteScreen = () => {
    //usa el state de notes.active y se renombra a note
    const { active: note } = useSelector(state => state.notes)

    const [formValues, handleInputChange, reset] = useForm(note)
    const { body, title } = formValues
    //guardamos en (activeId) la nota actual seleccionada
    //variable mutable que no renderiza el componente si cambia
    const activeId = useRef(note.id)

    useEffect(() => {
        //la compara con la nota cambiada en el useSelector(active:note)
        if (note.id !== activeId.current) {
            reset(note)
            //se establece como nueva nota activa
            activeId.current = note.id
        }
    }, [note, reset])

    return (
        <div className='notes__main-content'>
            <NotesAppbar />
            <div className='notes__content'>

                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    className='notes__textarea'
                    placeholder='What happened today'
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {   //si hay url se muestra
                    (note.url) &&
                    <div className='notes__images'>
                        <img
                            src='https://th.bing.com/th/id/R.2c921f8b766300d27290c36d01cbcbfd?rik=FKCY5q%2f327y0UA&pid=ImgRaw&r=0'
                            alt='imagen'
                        />
                    </div>
                }

            </div>
        </div>
    )
};
