// {
//     notes: [],

//     active: null,
//     active: {
//          id: 4565887,
//          title: 'title,
//          body: '',
//          imageUrl:'',
//          date: 123456
//    }
// }

import { types } from "../../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.NOTES_ACTIVE:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.NOTES_ADD_NEW:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }

        case types.NOTES_LOAD:
            return {
                ...state,
                notes: [...action.payload],
            }
        case types.NOTES_UPDATED:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }

        case types.NOTES_DELETE:
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => (
                    note.id !== action.payload
                ))
            }
        case types.NOTES_LOGOUT_CLEANING:
            return {
                ...state,
                active: null,
                notes: []
            }

        default:
            return state;
    }
};
