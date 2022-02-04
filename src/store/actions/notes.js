import {
    db,
    doc,
    setDoc,
    collection,
} from "../../firebase/firebase-config";
import { loadNotes } from "../../helpers/loadNotes";
import { types } from "../../types/types";

//inicia una nueva nota
export const startNewNote = () => {
    //getState es como el useSelector optiene el state
    return async (dispatch, getState) => {
        // const { uid } = getState().auth.uid
        const { uid } = getState().auth
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }
        //db contiene la referencia a firestore, seguido el path
        const ref = doc(collection(db, `${uid}/journal/notes`))
        //escribe nueva nota a la referencia(firestore)
        await setDoc(ref, newNote)
        const { id } = ref
        dispatch(activeNote(id, newNote))
    }
};
//activa modo edicion
export const activeNote = (id, note) => ({
    type: types.NOTES_ACTIVE,
    payload: {
        id,
        ...note
    }
})
//carga los notes
export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        // trae los datos de firestore
        const notes = await loadNotes(uid)
        // guarda los notes en el storage
        dispatch(setNotes(notes))
    }
};


//almacena las notas en el store
export const setNotes = (notes) => ({
    type: types.NOTES_LOAD,
    payload: notes,
})
