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

        default:
            return state;
    }
};
