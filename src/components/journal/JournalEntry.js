import React from 'react';

export const JournalEntry = () => {
    return (
        <div className='journal__entry pointer'>

            <div
                className='journal__entry-picture'
                style={{
                    backgroundColor: 'cover',
                    backgroundImage: 'url(https://c1.staticflickr.com/6/5624/30339149272_88c9268794_k.jpg)'
                }}
            >
            </div>

            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    Un nuevo Dia
                </p>
                <p className='journal__entry-content'>
                    Excepteur occaecat voluptate in reprehenderit dolore.
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
};
