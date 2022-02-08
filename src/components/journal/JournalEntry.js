import React from 'react';
import moment from 'moment'

import { useDispatch } from 'react-redux';
import { activeNote } from '../../store/actions/notes'


export const JournalEntry = ({ id, date, title, body, url }) => {
    //moment.js para el manejo de fechas
    const noteDate = moment(date)
    const dispatch = useDispatch()
    //abre la nota
    const handleEntryClick = () => {
        dispatch(activeNote(id, { date, title, body, url }))
    }


    return (
        <div
            onClick={handleEntryClick}
            className='journal__entry pointer'
        >

            {   //si url es diferente de undefined me muestra la img
                url &&
                <div
                    className='journal__entry-picture'
                    style={{
                        backgroundColor: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                >
                </div>
            }

            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    {title}
                </p>
                <p className='journal__entry-content'>
                    {body}
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
};
