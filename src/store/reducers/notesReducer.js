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

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {


        default:
            return state;
    }
};
