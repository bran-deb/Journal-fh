import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote } from '../../store/actions/notes';
import { NotesAppbar } from './NotesAppbar';

export const NoteScreen = () => {

    const dispatch = useDispatch()
    //usa el state de notes.active y se renombra a note
    const { active: note } = useSelector(state => state.notes)

    const [formValues, handleInputChange, reset] = useForm(note)
    const { body, title } = formValues
    //guardamos en (activeId) la nota actual seleccionada
    //variable mutable que no renderiza el componente si cambia
    const activeId = useRef(note.id)//note.id es el state.active.id

    useEffect(() => {
        //la compara con la nota cambiada en el useSelector(active:note)
        if (note.id !== activeId.current) {
            reset(note)
            //se establece como nueva nota activa
            activeId.current = note.id
        }
    }, [note, reset])

    useEffect(() => {
        // activeNote(id,note)se manda con spread para que lo vea como object
        dispatch(activeNote(formValues.id, { ...formValues }))
    }, [formValues, dispatch])

    return (
        <div className='notes__main-content'>
            <NotesAppbar />
            <div className='notes__content'>

                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    className='notes__textarea'
                    placeholder='What happened today'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {   //si hay url se muestra
                    (note.url) &&
                    <div className='notes__images'>
                        <img
                            src={note.url}
                            alt='imagen'
                        />
                    </div>
                }

            </div>
        </div>
    )
};
