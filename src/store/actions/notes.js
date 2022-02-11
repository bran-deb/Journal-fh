import Swal from 'sweetalert2'
import {
    db,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    collection,
} from "../../firebase/firebase-config";
import { fileUpload } from '../../helpers/fileUpload';
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


//async action actualiza los datos a firestore
export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        // const uid  = getState().auth.uid
        const { uid } = getState().auth
        //si note es undefined no se puede borrar el id por lo que verifica si existe
        if (!note.url) {
            delete note.url
        }
        //elimina el id por que no lo quiero guardar en la db
        const noteToFirestore = { ...note }
        delete (noteToFirestore.id)
        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)
        //actualiza en la referencia(noteref) con noteToFirestore(sin id)
        await updateDoc(noteRef, noteToFirestore)
        dispatch(refresNote(note.id, noteToFirestore))
        //mesaje sweetalert2
        Swal.fire('Saved', note.title, 'success')
    }
}
//actualiza la vista de la nota
export const refresNote = (id, note) => ({
    type: types.NOTES_UPDATED,
    payload: {
        id,
        note: {  //le ponemos a la nota un id
            id,
            ...note
        }
    }
})

// action async subida de img
export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes
        //mostrar un loading
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            showConfirmButton: false,
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading()
            }
        })
        //postea file y reorna el url
        const fileURL = await fileUpload(file)
        // añade la url a nota activa
        activeNote.url = fileURL
        dispatch(startSaveNote(activeNote))
        //se cierra el loading
        Swal.close()
    }
}
//elimina los notes de firestore
export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState(getState).auth
        const noteRef = doc(db, `${uid}/journal/notes/${id}`)
        await deleteDoc(noteRef)
        dispatch(deleteNote(id))
    }
}
//actualiza datos del state
export const deleteNote = (id) => ({
    type: types.NOTES_DELETE,
    payload: id
})
//limpia notas cuando se desconecta
export const noteLogout = () => ({
    type: types.NOTES_LOGOUT_CLEANING
})
